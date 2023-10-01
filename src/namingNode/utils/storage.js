const crypto = require('crypto');

const storageMap = new Map();

function hashName(name) {
  return crypto.createHash('sha256').update(name).digest('hex');
}

module.exports = {
  find : (name) => {
    const key = hashName(name);
    return storageMap.get(key);
  },
  save : (name, ip) => {
    const key = hashName(name);

    if (storageMap.has(key)) {
      throw new Error('key Unavailable');
    }
  }
};

