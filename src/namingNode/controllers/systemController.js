const storage = require('../utils/storage');

module.exports = {
  getHealthStatus: (req, res) => {
    res.status(200).send('Healthy');
  },

  getCurrentHashMap: (req, res) => {
    const storageMap = storage.getEntireMap();
    res.json(storageMap);
  }
};
