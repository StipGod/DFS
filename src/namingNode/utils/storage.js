const crypto = require('crypto');

const storageMap = new Map();

function hashName(name) {
  return crypto.createHash('sha256').update(name).digest('hex');
}

module.exports = {
  find : (name) => {
    const key = hashName(name);

    const storageNodeIps = storageMap.get(key);

    if (!storageNodeIps) {
      throw new Error('File not found');
    }

    return storageNodeIps;
  },
  
  save : (name, storageNodeIps) => {
    if (!Array.isArray(storageNodeIps) || storageNodeIps.length !== 2) {
      throw new Error('storageNodeIps must be an array of 2 ips');
    }

    const key = hashName(name);

    if (storageMap.has(key)) {
      throw new Error('key Unavailable');
    }

    storageMap.set(key, storageNodeIps);
  },
  exists : (name) => {
    const key = hashName(name);

    return storageMap.has(key);
  },
  testSave : () => {
    storageMap.set(hashName('test'), ['0.0.1.1','0.0.2.1']);
  },

  setEntireMap: (newMap) => {
    for (let [key, value] of newMap.entries()) {
      storageMap.set(key, value);
    }
  },

  getEntireMap: () => {
    return storageMap;
  }
};

