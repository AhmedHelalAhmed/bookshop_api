const db_client = require('./db_config.js');

function login(email, password, callback) {
    db_client.query(`SELECT * FROM customers
    WHERE email = '${email}' AND password = '${password}'`,
        (err, res) => {
            if (err) {
                return callback(err, null);
            }
            if (res['rowCount'] == 1) {
                return callback(null, res['rows'][0]);
            }
            else {
                return callback(null, 'UserNotFound');
            }
        });
}

module.exports = login;