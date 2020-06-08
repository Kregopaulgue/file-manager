const express = require('express');
const router = express.Router();

const { TagModel } = require('./../models/Tag.js');
const { ProjectTagModel } = require('./../models/ProjectTag.js');
const { FileTagModel } = require('./../models/FileTag.js');

router.post('/', async (req, res) => {
    try {
        const { tag, project, file } = req.body;
        const newTag = new TagModel({
            tag
        });
        await newTag.save();
        
        const payload = { tag: newTag };
        if(project) {
            const newProjectTag = new ProjectTagModel({
                project,
                tag: newTag._id
            });
            await newProjectTag.save();
            payload.projectTag = newProjectTag;
        }

        if(file) {
            const newFileTag = new FileTagModel({
                file,
                tag: newTag._id
            });
            await newFileTag.save();
            payload.fileTag = newFileTag;
        }

        res.status(200).json(payload);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Error occurred'
        });
    }
});

router.post('/bind', async (req, res) => {
    try {
        const { tag, project, file } = req.body;
        
        const payload = {};
        if(project) {
            const newProjectTag = new ProjectTagModel({
                project,
                tag
            });
            await newProjectTag.save();
            payload.projectTag = newProjectTag;
        }

        if(file) {
            const newFileTag = new FileTagModel({
                file,
                tag
            });
            await newFileTag.save();
            payload.fileTag = newFileTag;
        }

        res.status(200).json(payload);
    } catch(error) {
        res.status(500).json({
            message: 'Error occurred'
        });
    }
});

module.exports = router;