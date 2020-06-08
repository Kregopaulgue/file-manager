const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    title: String
});

const RoleModel = mongoose.model('Roles', RoleSchema);

module.exports = {
    RoleModel
}