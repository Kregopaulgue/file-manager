const mongoose = require('mongoose');
const debug = require('debug');

const databaseUrl = 
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@filemanager-5op5n.mongodb.net/test?retryWrites=true&w=majority`; 

async function initiateMongoServer() {
    try {
        await mongoose.connect(databaseUrl, {
            useNewUrlParser: true
        });
    } catch(error) {
        debug(error);
        throw error;
    }
}

module.exports = {
    initiateMongoServer
}