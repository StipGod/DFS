const fileSystem = require('../utils/fileSystem');

module.exports = {
  find: async (req, res) => {
    try {
      const fileName = req.query.fileName; 

    } catch (error) {
      console.error('Error in find:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
