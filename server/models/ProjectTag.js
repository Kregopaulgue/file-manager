const mongoose = require('mongoose');

const ProjectTagSchema = new mongoose.Schema({
    file: mongoose.Schema.Types.ObjectId,
    tag: mongoose.Schema.Types.ObjectId
});

const ProjectTagModel = mongoose.model('ProjectTags', ProjectTagSchema);

module.exports = {
    ProjectTagModel
}