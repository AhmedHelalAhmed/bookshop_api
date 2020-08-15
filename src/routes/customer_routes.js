require('dotenv').config()
const router = require('express').Router();

const customer_admin = require('../db_layer/customer_admin.js');

router.get('/recommended_books/', (req, res) => {
    const customer_id = req.query['customer_id'];
});

router.post('/buy_book/', (req, res) => {
    
});

router.get('/purchase_history/', (req, res) => {
    
});

router.put('/update_favorite_genres/', (req, res) => {
    
});

module.exports = router;