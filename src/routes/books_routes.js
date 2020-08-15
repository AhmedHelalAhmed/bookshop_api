require('dotenv').config()
const router = require('express').Router();

const validate_book = require('../services/book_validator.js');
const add_new_book = require('../db_layer/new_books_adder.js');
const get_books = require('../db_layer/books_getter.js');

router.post('/add_new_book/', (req, res) => {
    const API_KEY = req.headers['api_key'];
    if (API_KEY != process.env.API_KEY) {
        return res.status(403).send('access forbidden!');
    }
    const new_book = {
        title: req.body['title'],
        description: req.body['description'],
        quantity: req.body['quantity'],
        publish_date: req.body['publish_date'],
        author: req.body['author'],
        price: req.body['price'],
        genre: req.body['genre'],
    };
    validate_book(new_book, (err) => {
        if (err) {
            const errorMessage = err['details'][0]['message'];
            return res.status(400).send(errorMessage);
        }
        add_new_book(new_book, (err) => {
            if (err) {
                return res.status(500).send(err['detail']);
            }
            return res.json(new_book);
        });
    });
});

router.get('/all/', (req, res) => {
    get_books((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
        return res.end();
    });
});

module.exports = router;