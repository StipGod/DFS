const storage = require('../utils/storage');

module.exports = {
  getHealthStatus: (req, res) => {
    res.status(200).send('Healthy');
  },

  getCurrentHashMap: (req, res) => {
    const storageMap = storage.getEntireMap();
    res.json(storageMap);
  },

  getAllFiles: (req, res) => {
    try {
        const allFiles = storage.getAllFiles();
        res.json(allFiles);
    } catch (error) {
        console.error('Error in getAllFiles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }

};
