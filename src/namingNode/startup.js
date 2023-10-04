const axios = require('axios'); 
const storage = require('./utils/storage.js');

function startup(config){
  // Logic when the naming node starts up
  console.log('Starting up...');
  const storageNodes = config.storageNodes;
  console.log('Storage Nodes:', storageNodes);
  const otherNameNodeIP = config.namingNodes;
  console.log('Other Naming Node IP:', otherNameNodeIP);

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
      //console.log('Other NameNode is not alive:', error);
    });
}

module.exports = {
  startup
};
