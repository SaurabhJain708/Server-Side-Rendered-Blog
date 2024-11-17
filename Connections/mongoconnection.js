const mongoose = require('mongoose')

 async function ConnectMongodb(url){
    await mongoose.connect(url)
}

module.exports = ConnectMongodb;