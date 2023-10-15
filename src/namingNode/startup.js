const axios = require('axios'); 
const storage = require('./utils/storage');

function startup(config){
  console.log('Starting up...');
  const storageNodes = config.storageNodes;
  console.log('Storage Nodes:', storageNodes);
  
  const otherNameNodeIP = config.namingNodes[0];
  console.log('Other Naming Node:', otherNameNodeIP);

  axios.get(`http://${otherNameNodeIP}:3000/health`) 
    .then(response => {
      if (response.status === 200) {
        axios.get(`http://${otherNameNodeIP}:3000/get-current-hashmap`)
          .then(hashMapResponse => {
            storage.setEntireMap(hashMapResponse.data);
            console.log('Successfully synchronized hashmap with the other NameNode.');
          })
          .catch(error => {
            console.error('Failed to fetch hashmap from the other NameNode:', error);
          });
      }
    })
    .catch(error => {
      //console.log('Other NameNode is not alive:', error);
    });
}

module.exports = {
  startup
};
