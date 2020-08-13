require('dotenv').config()
const router = require('express').Router();

const user_validator = require('../services/user_validator.js');
const user_signup = require('../db_layer/user_signup.js');
const user_login = require('../db_layer/user_login.js');

router.post('/signup/', (req, res) => {
    const API_KEY = req.headers['api_key'];
    if (API_KEY == process.env.API_KEY) {
        const newUser = {
            name: req.body['name'],
            email: req.body['email'],
            password: req.body['password'],
            confirmPassword: req.body['confirmPassword'],
        };
        user_validator(newUser, (err) => {
            if (err) {
                const errorMessage = err['details'][0]['message'];
                res.status(400).send(errorMessage);
                return;
            }
            user_signup(newUser, (err) => {
                if (err) {
                    res.status(400).send(err['detail']);
                    return;
                }
                res.send(newUser);
            });
        });
    } else {
        res.status(403).send('access forbidden!');
    }

});

router.get('/login/', (req, res) => {
    const email = req.body['email'];
    const password = req.body['password'];
    if (!email || !password) {
        res.status(400).send('Bad request!');
        return;
    }
    user_login(email, password, (err, response) => {
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