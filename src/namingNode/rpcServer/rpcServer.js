const grpc =require( '@grpc/grpc-js');
const protoLoader =require( '@grpc/proto-loader');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const fileManager = require('../../grpcConfig/fileManager'); 

const createFile = require('./utils/createFile')

async function getServer() {
  console.info("grpc Consumer service is started...");


  var server = new grpc.Server();
  server.addService(fileManager.service, {
    //METHODS
    createFile,
  });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}
getServer()