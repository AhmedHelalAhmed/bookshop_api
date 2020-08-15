const db_client = require('./db_config.js');

function add_new_book(book, callback) {
    db_client.query(`INSERT INTO books 
    (title, description, quantity, publish_date, author, price, genre)
    VALUES ('${book.title}', '${book.description}', '${book.quantity}', 
    '${book.publish_date}', '${book.author}', '${book.price}', '${book.genre}');`,
        (err) => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
}

module.exports = add_new_book;