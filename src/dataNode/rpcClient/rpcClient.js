const grpc =require( '@grpc/grpc-js');
//apigateway
const path = require('path');
const dotenv = require('dotenv');

const fs = require('fs');


dotenv.config({ path: path.join(__dirname, '../../../.env') });

const fileManager = require(path.join(__dirname,'../../grpcConfig/fileManager')); 


const {RPC_PORT , NAMING_NODE_HOST} = process.env

const createFile = (storageIps,HOST,PORT)=>{
   const client = new fileManager(`${HOST}:${PORT}`,grpc.credentials.createInsecure());
   console.log(storageIps)
   client.createFile({storageIps}, (err, data) => {
     if(err){
       console.log(err);
      } else {
        console.log('Response received from remote service:', data); // API response
      }
    }); 
  }
  const uploadFile = (fileName,HOST)=>{
  const client = new fileManager(`${HOST}:${RPC_PORT}`,grpc.credentials.createInsecure());
  const fileStream = fs.createReadStream(path.join(__dirname,`../filesStorage/${fileName}`));
  const call = client.UploadFile((error, response) => {
    if (response.success) {
        console.log('File uploaded successfully.');
        //LLAMAR AL NAMING NODE PARA ACTUALIZAR HASHMAP
        // const namingNodeClient = new fileManager(`${NAMING_NODE_HOST}:${RPC_PORT}`,grpc.credentials.createInsecure());

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

// uploadFile("profile-pic.jpg","localhost");
// createFile(["0.0.1.1","0.0.2.1"]);
module.exports ={
    createFile,
    uploadFile,
}