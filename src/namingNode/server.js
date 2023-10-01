const express = require('express');
const bodyParser = require('body-parser');

const findController = require('./controllers/findController');
const resourceController = require('./controllers/resourceController');

function serve(port, host) {
  const app = express();
  app.use(bodyParser.json());

  app.get('/find', findController.find);
  app.post('/resource',resourceController.createResource);
  app.put('/resource',resourceController.updateResource);

  app.listen(port, () => {
    console.log(`Naming Node on http://${host}:${port}`);
  });
}

module.exports = {
  serve
};
