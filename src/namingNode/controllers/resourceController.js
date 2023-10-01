const storage = require('../utils/storage');

module.exports = {
  createResource: (req, res) => {
    try {
      const fileName = req.body.fileName;

      if(storage.exists(fileName)){
        throw new Error('fileName already exists');
      }

      // hay que cargar las cosas del congif 

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
