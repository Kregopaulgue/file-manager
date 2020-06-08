const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    project: mongoose.Schema.Types.ObjectId,

    url: String,
    name: String,
    filetype: String
});

const FileModel = mongoose.model('Files', FileSchema);

module.exports = {
    FileModel
}