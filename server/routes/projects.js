const express = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const router = express.Router();

const { ProjectModel } = require('./../models/Project.js');
const { UserModel } = require('./../models/User.js');

router.post('/create', 
    [
        check('userId', 'User is not defined!').not().isEmpty(),
        check('title', 'Title is missing!').not().isEmpty()
    ],
    async (req, res) => {
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()) {
            return res.status(400).json({
                errors: validationErrors.array()
            });
        }

        const { userId, title, description, folder } = req.body;

        try {
            const projectOwner = await UserModel.findOne({ _id: userId });
            
            if(!projectOwner) {
                return res.status(404).json({
                    message: 'User with defined ID is not found!'
                });
            }

            folder = folder ? folder : title.toLowerCase().replace(' ', '-');
            const newProject = new ProjectModel({ userId, title, description, folder });
            await newProject.save();

            const payload = { project: newProject };
            return res.status(201).json(payload);
        } catch(error) {
            console.log(error);
            res.status(500).send('Error while creating project');
        }
    }
)

router.get('/:projectId', 
    async (req, res) => {
        const projectId = req.params.projectId;

        if(!projectId) {
            return res.status(500).json({
                message: 'No project id is provided'
            });
        }

        try {
            const project = await ProjectModel.findOne({ _id: projectId });
            if(!project) {
                return res.status(404).json({
                    message: 'No project with specified id is found'
                });
            }

            const payload = { project };
            res.status(200).json(payload);
        } catch(error) {
            console.log(error);
            return res.status(500).send('Error while getting project by id');
        }
    }    
);

router.get('/',
    async (req, res) => {
        try {
            const projects = await ProjectModel.find({});

            const payload = { projects };
            res.status(200).json(payload);
        } catch(error) {
            console.log(error);
            return res.status(500).send('Error while getting all projects');
        }
    }
);

router.put('/:projectId',
    [
        check('userId', 'No user id specified!').not().isEmpty(),
        check('title', 'No title is specified!').not().isEmpty(),
        check('description', 'No description set!').not().isEmpty(),
        check('folder', 'No folder set!').not().isEmpty()
    ],
    async (req, res) => {
        const validationErrors = validationResult(req);

        if(!validationErrors.isEmpty()) {
            return res.status(500).json({
                errors: validationErrors.array()
            });
        }

        const projectId = req.params.projectId;
        const { userId, title, description } = req.body;

        try {
            const projectToUpdate = ProjectModel.findById(projectId);
            if(!projectToUpdate) {
                return res.status(404).json({
                    message: 'Project was not found!'
                });
            }

            projectToUpdate.userId = userId;
            projectToUpdate.title = title;
            projectToUpdate.description = description;

            await projectToUpdate.save();

            const payload = { project: projectToUpdate };

            return res.status(200).json(payload)
        } catch(error) {
            console.log(error);
            return res.status(500).send('Error while updating project');
        }
    }
);

router.delete('/:projectId', 
    async (req, res) => {
        try {
            const projectId = req.params.projectId;
            if(!projectId) {
                return res.status(500).json({
                    message: 'No project id specified!'
                });
            }

            const removedProject = await ProjectModel.findByIdAndRemove(projectId);
            if(!removedProject) {
                return res.status(404).json({
                    message: 'No project with this id is found'
                });
            }

            res.status(204).send('Project is deleted!')
        } catch(error) {
            console.log(error);
            res.status(500).send('Error while deleting project');
        }
    }
);

module.exports = router;