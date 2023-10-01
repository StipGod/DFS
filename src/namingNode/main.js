const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const app = express();
const port = process.env.NAMING_NODE_PORT;
const host = process.env.NAMING_NODE_HOST;

app.use(bodyParser.json());

app.get('/find', (req, res) => {
  // send ither the ip of the data node that has the resource or respond with a file not found
  res.send('');
});

app.post('/resource', (req, res) => {
  // send the ip of the data node that will save the file. only send back the ip of the leader of that file. that leader will know here to save the replica
  const data = req.body;
  res.send(``);
});

app.put('/resource/:id', (req, res) => {
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
