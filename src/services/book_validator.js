const Joi = require('joi');

const genres = ['fantasy', 'adventure', 'mystery', 'science fiction',
    'art', 'cooking', 'history', 'programming', 'science', 'islamic'];

async function validate(book, callback) {
    const book_schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        description: Joi.string(),
        quantity: Joi.number().integer().min(1).required(),
        publish_date: Joi.date().required(),
        author: Joi.string().min(3).required(),
        price: Joi.number().min(1).precision(2).required(),
        genre: Joi.string().valid(...genres).required(),
    });
    try {
        await book_schema.validateAsync(book);
        callback(null);
    }
    catch (err) {
        callback(err);
    }
}

module.exports = validate;