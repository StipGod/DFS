const fileSystem = require('../utils/fileSystem');
const path = require('path');

const FILES_STORAGE_PATH = path.join(__dirname, '../filesStorage');

module.exports = {
  find: async (req, res) => {
    try {
      const fileName = req.query.fileName; 

      if(!fileName){
        return res.status(400).json({ error: 'fileName is required' });
      }

      const file = await fileSystem.find(fileName);

      if(!file){
        return res.status(404).json({ error: 'File not found' });
      }

      const filePath = path.join(FILES_STORAGE_PATH, file);

      res.sendFile(filePath);
    } catch (error) {
      console.error('Error in find:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
