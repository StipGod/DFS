function startup(config){
  console.log('Starting up...');
  const storageNodes = config.storageNodes;
  console.log('Storage Nodes:',storageNodes);
}

module.exports = {
  startup
};
