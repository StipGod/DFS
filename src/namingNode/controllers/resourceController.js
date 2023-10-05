const storage = require('../utils/storage');

module.exports = {
  createResource: (req, res) => {
    try {
      const fileName = req.query.fileName;
      const storageMap = req.storageMap;
      
      if(storage.exists(fileName)){
        return res.status(400).json({ error: 'fileName already exists' });
      }

      const config = req.config;
      const storageNodes = config.storageNodes;

      if(storageNodes.length === 0){
        return res.status(400).json({ error: 'Storage Nodes not available' });
      }

      const randomIndex = Math.floor(Math.random() * storageNodes.length);//random es[0,1)
      const randomIp = storageNodes[randomIndex];
      const  randomJump = Math.floor(Math.random() * (storageNodes.length-1)) + 1;
      const randomSecondIndex = (randomIndex + randomJump) % storageNodes.length;
      const randomIp2 = storageNodes[randomSecondIndex];

      storage.save(fileName, [randomIp,randomIp2]);

      res.json({ ip: [randomIp,randomIp2] });
    } catch (error) {
      console.error('Error in createResource:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
  updateResource: (req, res) => {
    try {
      const fileName = req.query.fileName; 
      const storageMap = req.storageMap;
      const storageNodeIps = storage.find(fileName);
      res.json({ip: storageNodeIps})

    } catch (error) {
      console.error('Error in updateResource:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
