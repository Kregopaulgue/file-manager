const mongoose = require('mongoose');

const ProjectTagSchema = new mongoose.Schema({
    project: mongoose.Schema.Types.ObjectId,
    tag: mongoose.Schema.Types.ObjectId
});

const ProjectTagModel = mongoose.model('ProjectTags', ProjectTagSchema);

module.exports = {
    ProjectTagModel
}