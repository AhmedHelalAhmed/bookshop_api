require('dotenv').config()
const router = require('express').Router();

const validate_user = require('../services/user_validator.js');
const signup_user = require('../db_layer/user_signup.js');
const login_user = require('../db_layer/user_login.js');

router.post('/signup/', (req, res) => {
    const API_KEY = req.headers['api_key'];
    if (API_KEY != process.env.API_KEY) {
        res.status(403).send('access forbidden!');
        return;
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
            res.status(400).send(errorMessage);
            return;
        }
        signup_user(new_user, (err) => {
            if (err) {
                res.status(500).send(err['detail']);
                return;
            }
            res.send(new_user);
        });
    });
});

router.get('/login/', (req, res) => {
    const email = req.body['email'];
    const password = req.body['password'];
    if (!email || !password) {
        res.status(400).send('Bad request!');
        return;
    }
    login_user(email, password, (err, response) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (response == 'UserNotFound') {
            res.status(404).send('UserNotFound');
            return;
        }
        else {
            res.send(response);
        }

    });
});

module.exports = router;