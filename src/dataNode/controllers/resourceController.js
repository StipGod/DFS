module.exports = {
  createResource: (req, res) => {
    try {

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
