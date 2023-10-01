const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs').promises;

const { startup } = require('./startup');
const { serve } = require('./server');

dotenv.config({ path: path.join(__dirname, '../../.env') });
const configPath = path.join(__dirname, './config.json');
const port = process.env.NAMING_NODE_PORT;
const host = process.env.NAMING_NODE_HOST;

async function main() {
  const configContent = await fs.readFile(configPath, 'utf-8');
  const config = JSON.parse(configContent);

  const storageNodes = config.storageNodes;

  startup(storageNodes);
  serve(port,host);
}main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


