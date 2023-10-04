const fs = require('fs');
const crypto = require('crypto');

const path = require('path')
const storageFilePath = path.join(__dirname,'storageMap.json');

function hashName(name) {
  return crypto.createHash('sha256').update(name).digest('hex');
}

function saveStorageMap(storageMap) {
  const storageMapJSON = JSON.stringify(storageMap);
  fs.writeFileSync(storageFilePath, storageMapJSON);
}

function loadStorageMap() {
  try {
    const storageMapJSON = fs.readFileSync(storageFilePath);
    return JSON.parse(storageMapJSON);
  } catch (error) {
    // Handle error (e.g., file doesn't exist)
    console.error('Error loading storageMap:', error);
    return {};
  }
}

module.exports = {
  find: (name) => {
    const key = hashName(name);

    const storageMap = loadStorageMap();
    const storageNodeIps = storageMap[key];

    if (!storageNodeIps) {
      throw new Error('File not found');
    }

    return storageNodeIps;
  },
  
  save: (name, storageNodeIps) => {
    if (!Array.isArray(storageNodeIps) || storageNodeIps.length !== 2) {
      throw new Error('storageNodeIps must be an array of 2 ips');
    }

    const key = hashName(name);
    const storageMap = loadStorageMap();
    if (storageMap[key]) {
      throw new Error('key Unavailable');
    }

    storageMap[key] = storageNodeIps;
    saveStorageMap(storageMap);
  },
  
  exists: (name) => {
    const key = hashName(name);
    const storageMap = loadStorageMap();

    return !!storageMap[key];
  },
  
  testSave: () => {
    const storageMap = loadStorageMap();
    storageMap[hashName('test')] = ['0.0.1.1','0.0.2.1'];
    saveStorageMap(storageMap);
  },

  setEntireMap: (newMap) => {
    saveStorageMap(newMap);
  },

  getEntireMap: () => {
    return loadStorageMap();
  }
};
