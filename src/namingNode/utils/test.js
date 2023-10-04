
const {save,exists} = require('./storage')

const name = "quiensera.txt";
const storageIps= ["localhost","localhost"];
const testFunction = ()=>{
    save(name,storageIps)
    // console.log(exists("hoa"));
}
testFunction()