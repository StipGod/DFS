const grpc =require( '@grpc/grpc-js');
const protoLoader =require( '@grpc/proto-loader');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const fileManager = require('../../grpcConfig/fileManager'); 

const createFile = require('./utils/createFile')

const fileSystem = require('../utils/fileSystem');

async function getServer() {
  console.info("grpc Consumer service is started...");


  var server = new grpc.Server();
  server.addService(fileManager.service, {
    createFile,
    //METHODS
    UploadFile: (call, callback) => {
      let data = Buffer.alloc(0);
      let fileName = null;
      call.on('data', (chunk) => {
        if (!fileName) {
          fileName = chunk.fileName;
        }
          data = Buffer.concat([data, chunk.chunk]);
      });

      call.on('end', () => {
        if(!fileName){
          callback('File name not provided.',null);
          return;
        }
        //CAMBIAR NOMBRE DE ARCHIVO 
        fs.writeFile(`../filesStorage/a${fileName}`, data, (err) => {
          if (err) {
              callback(err, { success: false, message: 'Error saving file.' });
          } else {
              callback(null, { success: true, message: 'File uploaded successfully.' });
          }
      });
      });
  },
  });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}
getServer()