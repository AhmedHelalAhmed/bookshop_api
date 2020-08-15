const db_client = require('./db_config.js');

function get_books(callback) {
    db_client.query('SELECT * FROM books;',
        (err, res) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, res['rows']);
            return res.end();
        });
}

module.exports = get_books;