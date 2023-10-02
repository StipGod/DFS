
require('express-async-errors')
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const findController = require('./controllers/findController');
const resourceController = require('./controllers/resourceController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './filesStorage/');
  },
  filename: (req, file, cb) => {
    const filePath = path.join('./filesStorage/', file.originalname);
    
    if (req.method === 'PUT') {
      return cb(null, file.originalname);
    }
    
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (!err) {
        return cb(new Error('File with this name already exists'));
      }
      cb(null, file.originalname);
    });
  }
});

const errorHandling = (err, req, res, next) => {
  res.status(500).json({
    msg: err.message,
    success: false,
  });
};
function serve(port, host, config) {
  const app = express();
  const upload = multer({ storage: storage });

  app.use(bodyParser.json());
  app.use((req, res, next) => {
    req.config = config; 

    next();
  });

  app.get('/find', findController.find);
  app.post('/resource', upload.single('file'), resourceController.createResource);
  app.put('/resource', upload.single('file'), resourceController.updateResource);
  app.use(errorHandling)
  app.listen(port, () => {
    console.log(`DataNode on http://${host}:${port}`);
  });
}

module.exports = {
  serve
};
