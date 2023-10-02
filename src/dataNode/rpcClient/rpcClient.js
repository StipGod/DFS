const grpc =require( '@grpc/grpc-js');
//apigateway
const path = require('path');
const dotenv = require('dotenv');

const fs = require('fs');


dotenv.config({ path: path.join(__dirname, '../../../.env') });

const fileManager = require('../../grpcConfig/fileManager'); 


const {NAMING_NODE_HOST, RPC_PORT} = process.env

const client = new fileManager(`${NAMING_NODE_HOST}:${RPC_PORT}`,grpc.credentials.createInsecure());
 const createFile = (storageIps)=>{
  console.log(storageIps)
  client.createFile({storageIps}, (err, data) => {
    if(err){
        console.log(err);
    } else {
      console.log('Response received from remote service:', data); // API response
    }
  }); 
}
const uploadFile = (fileName)=>{

  const fileStream = fs.createReadStream(`../filesStorage/${fileName}`);
  const call = client.UploadFile((error, response) => {
    if (response.success) {
        console.log('File uploaded successfully.');
        //LLAMAR AL NAMING NODE PARA ACTUALIZAR HASHMAP
    } else {
        console.error(`Error: ${response.message}`);
    }
  });
  fileStream.on('data', (chunk) => {
    call.write({fileName, chunk });
  });

  fileStream.on('end', () => {
    call.end();
  });
}

// uploadFile("fall.jpg");
// createFile(["0.0.1.1","0.0.2.1"]);
module.exports ={
    createFile
}