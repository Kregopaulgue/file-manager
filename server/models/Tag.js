const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    tag: String
});

const TagModel = mongoose.model('Tags', TagSchema);

module.exports = {
    TagModel
}