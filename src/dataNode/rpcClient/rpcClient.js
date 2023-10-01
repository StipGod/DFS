const grpc =require( '@grpc/grpc-js');
//apigateway
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const fileManager = require('../../grpcConfig/fileManager'); 


const {NAMING_NODE_HOST, RPC_PORT} = process.env

 const createFile = (storageIps)=>{
  const client = new fileManager(`${NAMING_NODE_HOST}:${RPC_PORT}`,grpc.credentials.createInsecure());
  console.log(storageIps)
  client.createFile({storageIps}, (err, data) => {
    if(err){
        console.log(err);
    } else {
      console.log('Response received from remote service:', data); // API response
    }
  }); 
}

createFile(["0.0.1.1","0.0.2.1"]);
module.exports ={
    createFile
}