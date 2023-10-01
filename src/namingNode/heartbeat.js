const axios = require('axios');
const config = require('./config.json');

let isPrimaryActive = true;

async function checkPrimaryHealth() {
  if (!isPrimaryActive) {
    return;
  }

  try {
    await axios.get(`http://${config.primary.host}:${config.primary.port}/heartbeat`);
  } catch (error) {
    console.error('Primary NameNode is down. Switching to secondary mode...');
    isPrimaryActive = false;
    // volver follower el main
  }
}

// hearbeat cada minuto
setInterval(checkPrimaryHealth, 60000);
