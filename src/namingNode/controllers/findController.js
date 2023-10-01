const storage = require('../utils/storage');

module.exports = {
  find: async (req, res) => {
    try {
      // only for test 
      storage.testSave();
      // only for test 

      const fileName = req.query.fileName; 

      if(!fileName){
        throw new Error('fileName is required');
      }

      const storageNodeIps = storage.find(fileName);

      res.json({
        ips : storageNodeIps
      });
 
    } catch (error) {
      console.error('Error in find:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
