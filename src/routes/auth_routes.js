require('dotenv').config()
const router = require('express').Router();

const user_validator = require('../services/user_validator.js');
const user_signup = require('../db_layer/user_signup.js');

router.post('/signup_user/', (req, res) => {
    const API_KEY = req.headers['api_key'];
    if (API_KEY == process.env.API_KEY) {
        const userAvatar = Buffer.from(req.body['avatar'], 'base64');
        const newUser = {
            name: req.body['name'],
            email: req.body['email'],
            password: req.body['password'],
            password_repeat: req.body['password_repeat'],
            phoneNumber: req.body['phoneNumber'],
            avatar: userAvatar,
            gender: req.body['gender']
        };

        user_validator(newUser, (err) => {
            if (err) {
                const errorMessage = err['details'][0]['message'];
                res.status(400).send(errorMessage);
                return;
            }
            user_signup(newUser, (err) => {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                    return;
                }
                res.send(newUser);
            });
        });
    } else {
        res.status(403).send('access forbidden!');
    }

});

router.get('/login_user/', async (req, res) => {

});

module.exports = router;