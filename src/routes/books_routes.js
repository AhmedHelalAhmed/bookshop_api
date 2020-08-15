require('dotenv').config()
const router = require('express').Router();

const validate_book = require('../services/book_validator.js');
const books_admin = require('../db_layer/books_admin.js');

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
        books_admin.add_new_book(new_book, (err) => {
            if (err) {
                return res.status(500).send(err['detail']);
            }
            return res.json(new_book);
        });
    });
});

router.get('/all/', (req, res) => {
    books_admin.get_books((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json(result);
    });
});


router.get('/search/', (req, res) => {
    const search_keyword = req.query['keyword'];
    if (!search_keyword) {
        return res.status(400).send('keyword must not be empty!');
    }
    books_admin.search(search_keyword, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json(result);
    });
});

router.put('//', (req, res) => {

});


router.delete('//', (req, res) => {

});

module.exports = router;