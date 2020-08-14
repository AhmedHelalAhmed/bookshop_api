const db_client = require('./db_config.js');

function get_books(callback) {
    console.log(process.env.DB_USER);
    console.log(process.env.DB_PASSWORD);
    console.log(process.env.DB_NAME);
    console.log(process.env.DB_HOST);
    console.log('books_getter 5');
    db_client.query('SELECT * FROM books;',
        (err, res) => {
            console.log('books_getter 8');
            if (err) {
                console.log('books_getter 9');
                callback(err, null);
                return;
            }
            console.log('books_getter 14');
            callback(null, res['rows']);
        });
}

module.exports = get_books;