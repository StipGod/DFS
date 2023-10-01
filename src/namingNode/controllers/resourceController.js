const storage = require('../utils/storage');

module.exports = {
  createResource: (req, res) => {
    try {
      // only for test 
      storage.testSave();
      // only for test 

      const fileName = req.body.fileName;

      if(storage.exists(fileName)){
        return res.status(400).json({ error: 'fileName already exists' });
      }

      const config = req.config;
      const storageNodes = config.storageNodes;

      if(storageNodes.length === 0){
        return res.status(400).json({ error: 'Storage Nodes not available' });
      }

      const randomIndex = Math.floor(Math.random() * storageNodes.length);
      
      const randomIp = storageNodes[randomIndex];

      res.json({ ip: randomIp });
    } catch (error) {
      console.error('Error in createResource:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
  updateResource: (req, res) => {
    try {

   
    } catch (error) {
      console.error('Error in updateResource:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
