const mongoose = require('mongoose');
require('dotenv').config();

let db = async() => {
    let Db = mongoose.connect(process.env.MONGO_DB);
        console.log('connection to Db was successfull!');
        return Db;
}

module.exports = db;