const axios = require('axios'); 
const os = require('os'); 
const storage = require('./storage');

function startup(config){
  //Lógica cuando se vuelve a prender el naming node
  console.log('Starting up...');
  const storageNodes = config.storageNodes;
  console.log('Storage Nodes:',storageNodes);
  const namingNodes = config.namingNodes;
  console.log('Naming Nodes:',namingNodes);

  const currentIP = os.networkInterfaces().eth0[0].address; 

  const otherNameNodeIP = namingNodes[0] === currentIP ? namingNodes[1] : namingNodes[0];

  axios.get(`http://${otherNameNodeIP}:80/health`) 
    .then(response => {
      if (response.status === 200) {
        axios.get(`http://${otherNameNodeIP}:80/get-current-hashmap`)
          .then(hashMapResponse => {
            const otherNameNodeHashMap = new Map(Object.entries(hashMapResponse.data));
            storage.setEntireMap(otherNameNodeHashMap);
            console.log('Successfully synchronized hashmap with the other NameNode.');
          })
          .catch(error => {
            console.error('Failed to fetch hashmap from the other NameNode:', error);
          });
      }
    })
    .catch(error => {
      console.log('Other NameNode is not alive:', error);
    });
}

module.exports = {
  startup
};