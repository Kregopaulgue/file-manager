const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const debug = require('debug');

const router = express.Router();

const { UserModel } = require('./../models/User.js');

router.post('/signup', 
    [
        check('username', 'Invalid username!').not().isEmpty(),
        check('email', 'Invalid email!').isEmail(),
        check('password', 'Invalid password! Minimum six symbols').isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()) {
            return res.status(400).json({
                errors: validationErrors.array()
            });
        }

        const { username, email, password } = req.body;

        try {
            const user = await UserModel.findOne({ email });
            if(user) {
                return res.status(400).json({
                    message: 'User already exists!'
                });
            }

            const newUser = new UserModel({
                username,
                email,
                password
            });
            
            const passwordSalt = bcrypt.genSaltSync(10);
            newUser.password = bcrypt.hashSync(password, passwordSalt);

            await newUser.save();

            const payload = { user: newUser };

            jwt.sign(
                payload, 'secret', { expiresIn: '10000m' }, (error, token) => {
                    if (error) throw error;
                    return res.status(200).json({ token });
                }
            )
        } catch(error) {
            console.log(error);
            res.status(500).send('Error while saving user');
        }
    }
);

router.post('/login', 
    [
        check('email', 'Invalid email!').isEmail(),
        check('password', 'Invalid password!').isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const validationErrors = validationResult(req);

        if(!validationErrors.isEmpty()) {
            return res.status(400).json({
                errors: validationErrors.array()
            });
        }

        const { email, password } = req.body;
        try {
            const user = await UserModel.findOne({ email });

            if(!user) {
                res.status(404).json({
                    message: 'User does not exist!'
                });
            }

            const isPasswordMatching = bcrypt.compareSync(password, user.password);
            if(!isPasswordMatching) {
                return res.status(403).json({
                    message: 'Password doesnt match!'
                });
            }

            const payload = { user };

            jwt.sign(
                payload, 'secret', { expiresIn: '10000m' }, (error, token) => {
                    if (error) throw error;
                    res.status(200).json({ token });
                }
            );
        } catch(error) {
            console.log(error);
            res.status(500).json({
                message: 'Error while logging in'
            });
        }
    }
)

module.exports = router;