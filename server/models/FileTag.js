const mongoose = require('mongoose');

const FileTagSchema = new mongoose.Schema({
    file: mongoose.Schema.Types.ObjectId,
    tag: mongoose.Schema.Types.ObjectId
});

const FileTagModel = mongoose.model('FileTags', FileTagSchema);

module.exports = {
    FileTagModel
}