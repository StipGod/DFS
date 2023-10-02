require('express-async-errors');
const path = require('path');
const dotenv = require('dotenv')
const fileSystem = require('../utils/fileSystem');
const {uploadFile,createFile} = require('../rpcClient/rpcClient');


dotenv.config({ path: path.join(__dirname, '../../../.env') });


const {STORAGE_NODE_HOST,NAMING_NODE_HOST,RPC_SECONDARY_PORT,FOLLOWER_NODE_HOST,RPC_AUXILIARY_PORT} = process.env;


module.exports = {
  createResource: async(req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'File upload failed: No file received' });
      } 
      const host = req.query.host;

      // aqui mandamos el archivo a la replica
      uploadFile(req.file.originalname,host)

      //avisar al nameNode
      const storageIps = [STORAGE_NODE_HOST,req.query.host];
      createFile(storageIps,NAMING_NODE_HOST,RPC_SECONDARY_PORT);
      createFile(storageIps,NAMING_NODE_HOST,RPC_AUXILIARY_PORT);
      // createFile(storageIps,FOLLOWER_NODE_HOST,RPC_SECONDARY_PORT);


      return res.status(201).json({ message: 'File uploaded successfully' });
       
    } catch (error) {
      console.error('Error in createResource:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
  updateResource: (req, res) => {
    try {
      if (req.error) {
        return res.status(400).json({ error: 'File upload failed' });
      }
      if (!req.file) {
        return res.status(400).json({ error: 'File upload failed: No file received' });
      } 

      // aqui mandamos el update de archivo a la replica

      return res.status(201).json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error('Error in updateResource:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
