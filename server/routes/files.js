const express = require('express');
const router = express.Router();

const { ProjectModel } = require('../models/Project.js');
const { FileModel } = require('../models/File.js');

router.post('/', async (req, res) => {
    try {
        const { project, name, url, filetype } = req.body;
        const foundProject = await ProjectModel.findById(project);

        if(!foundProject) {
            res.status(404).json({
                message: 'Project not found'
            });
        }

        const newFile = new FileModel({
            project,
            name,
            url,
            filetype
        });
        await newFile.save();
        res.status(200).json({
            file: newFile
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Error while adding file'
        })
    }
});

module.exports = router;