const mongoose = require('mongoose');
const debug = require('debug');
const dotenv = require('dotenv');

dotenv.config();

const databaseUrl = 
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@filemanager-5op5n.mongodb.net/FileManager?retryWrites=true&w=majority`; 

async function initiateMongoServer() {
    debug(process.env.DATABASE_USER + ':' + process.env.DATABASE_PASSWORD)
    try {
        await mongoose.connect(databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch(error) {
        debug(error);
        throw error;
    }
}

module.exports = {
    initiateMongoServer
}