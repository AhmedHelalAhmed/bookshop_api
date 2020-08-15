require('dotenv').config()
const router = require('express').Router();

const validate_user = require('../services/user_validator.js');
const signup_user = require('../db_layer/user_signup.js');
const login_user = require('../db_layer/user_login.js');

router.post('/signup/', (req, res) => {
    const API_KEY = req.headers['api_key'];
    if (API_KEY != process.env.API_KEY) {
        return res.status(403).send('access forbidden!');
    }
    const new_user = {
        name: req.body['name'],
        email: req.body['email'],
        password: req.body['password'],
        confirmPassword: req.body['confirmPassword'],
    };
    validate_user(new_user, (err) => {
        if (err) {
            const errorMessage = err['details'][0]['message'];
            return res.status(400).send(errorMessage);
        }
        signup_user(new_user, (err) => {
            if (err) {
                return res.status(400).send(err['detail']);
            }
            return res.json(new_user);
        });
    });
});

router.get('/login/', (req, res) => {
    const email = req.body['email'];
    const password = req.body['password'];
    if (!email || !password) {
        return res.status(400).send('Bad request!');
    }
    login_user(email, password, (err, response) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (response == 'UserNotFound') {
            return res.status(404).send('UserNotFound');
        }
        else {
            return res.json(response);
        }
    });
});

module.exports = router;