const crypto = require('crypto');
const fs = require('fs').promises;

const storageMap = new Map();
const storageFilePath = 'storage.json';

async function loadFromFile() {
    try {
        const data = await fs.readFile(storageFilePath, 'utf-8');
        const jsonData = JSON.parse(data);
        for (let key in jsonData) {
            storageMap.set(key, jsonData[key]);
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(storageFilePath, JSON.stringify({}));
        } else {
            throw error;
        }
    }
}

async function saveToFile() {
    const jsonData = {};
    storageMap.forEach((value, key) => {
        jsonData[key] = value;
    });
    await fs.writeFile(storageFilePath, JSON.stringify(jsonData, null, 2));
}

function hashName(name) {
    return crypto.createHash('sha256').update(name).digest('hex');
}

loadFromFile().then(() => {
    console.log('Storage loaded from file.');
}).catch(error => {
    console.error('Error loading storage from file:', error);
});

module.exports = {
    find: async (name) => {
        const key = hashName(name);
        const storageNodeIps = storageMap.get(key);
        if (!storageNodeIps) {
            throw new Error('File not found');
        }
        return storageNodeIps;
    },

    save: async (name, storageNodeIps) => {
        if (!Array.isArray(storageNodeIps) || storageNodeIps.length !== 2) {
            throw new Error('storageNodeIps must be an array of 2 ips');
        }
        const key = hashName(name);
        if (storageMap.has(key)) {
            throw new Error('key Unavailable');
        }
        storageMap.set(key, storageNodeIps);
        await saveToFile();
    },

    exists: (name) => {
        const key = hashName(name);
        return storageMap.has(key);
    },

    testSave: async () => {
        storageMap.set(hashName('test'), ['0.0.1.1', '0.0.2.1']);
        await saveToFile();
    },

    setEntireMap: async (newMap) => {
        storageMap.clear();
        for (let [key, value] of newMap.entries()) {
            storageMap.set(key, value);
        }
        await saveToFile();
    },

    getEntireMap: () => {
        return storageMap;
    }
};
