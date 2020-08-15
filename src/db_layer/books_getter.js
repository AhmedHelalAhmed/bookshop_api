const db_client = require('./db_config.js');

function get_books(callback) {
    db_client.query('SELECT * FROM books;',
        (err, res) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, res['rows']);
        });
}

module.exports = get_books;