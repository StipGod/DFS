const express = require('express');
const bodyParser = require('body-parser');

const findController = require('./controllers/findController');
const resourceController = require('./controllers/resourceController');
const systemController = require('./controllers/systemController'); // Import the new controller



function serve(port, host, config) {
  const app = express();
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    req.config = config; 
    req.storageMap = storageMap;
    next();
  });

  app.get('/find', findController.find);
  app.post('/resource', resourceController.createResource);
  app.put('/resource', resourceController.updateResource);
  app.get('/health', systemController.getHealthStatus); 
  app.get('/get-current-hashmap', systemController.getCurrentHashMap); 
  app.get('/ls', systemController.getAllFiles);

  app.listen(port, () => {
    console.log(`Naming Node on http://${host}:${port}`);
  });
}

module.exports = {
  serve
};
