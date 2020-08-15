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

function get_books(callback) {
    db_client.query('SELECT * FROM books;',
        (err, res) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, res['rows']);
        });
}

function search(keyword, callback) {
    db_client.query(`SELECT * FROM books
     WHERE title LIKE '%${keyword}%' OR description LIKE '%${keyword}%';`,
        (err, res) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, res['rows']);
        });
}

module.exports.add_new_book = add_new_book;
module.exports.get_books = get_books;
module.exports.search = search;