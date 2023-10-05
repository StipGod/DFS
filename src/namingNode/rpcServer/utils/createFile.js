const { save, find } = require('../../utils/storage');

const createFile = (params, callback) => {
    const storageIps = params.request.storageIps;
    const fileName = params.request.fileName;

    console.log(storageIps);
    console.log(fileName);

    try {
        save(fileName, storageIps);
        console.log(find(fileName));
        const status_code = 201;
        callback(null, { status_code });
    } catch (error) {
        console.error('Error in createFile:', error);
        callback(error);
    }
}

module.exports = createFile;
