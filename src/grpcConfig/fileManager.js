const grpc =require( '@grpc/grpc-js');
const protoLoader =require( '@grpc/proto-loader');


const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const {PROTO_PATH} = process.env;
const packageDefinition = protoLoader.loadSync(
    path.join(__dirname,PROTO_PATH),
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const fileManager = grpc.loadPackageDefinition(packageDefinition).FileManager;

module.exports = fileManager;
