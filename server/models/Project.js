const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    folder: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const ProjectModel = mongoose.model('Projects', ProjectSchema);

module.exports = {
    ProjectModel
}