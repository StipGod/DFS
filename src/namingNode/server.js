const express = require('express');
const bodyParser = require('body-parser');

const findController = require('./controllers/findController');

function serve(port, host) {
  const app = express();
  app.use(bodyParser.json());

  app.get('/find', findController.find);

  app.post('/resource', (req, res) => {
    // send the ip of the data node that will save the file. only send back the ip of the leader of that file. that leader will know here to save the replica
    const data = req.body;
    res.send(``);
  });

  app.put('/resource', (req, res) => {
    // ither send the ip of the leader node that has that file or respond with a file not found
    // if the file is found send the ip of the leader node that has that file
    // that leader will know here the replica is saved
    const id = req.params.id;
    const data = req.body;
    res.send(``);
  });

  app.listen(port, () => {
    console.log(`Naming Node on http://${host}:${port}`);
  });
}

module.exports = {
  serve
};
