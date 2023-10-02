const fileSystem = require('../utils/fileSystem');

module.exports = {
  createResource: (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'File upload failed: No file received' });
      } 
      console.log(typeof req.file)
      console.log(req.file)

      // aqui mandamos el archivo a la replica






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
