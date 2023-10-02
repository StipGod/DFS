const storage = require('../utils/storage');

module.exports = {
  getHealthStatus: (req, res) => {
    res.status(200).send('Healthy');
  },

  getCurrentHashMap: (req, res) => {
    res.json(Array.from(storage.getEntireMap().entries()));
  }
};
