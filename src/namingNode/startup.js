function startup(config){
  //Lógica cuando se vuelve a prender el naming node
  console.log('Starting up...');
  const storageNodes = config.storageNodes;
  console.log('Storage Nodes:',storageNodes);
}

module.exports = {
  startup
};
