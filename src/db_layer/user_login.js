const dbClient = require('./db_config.js');

function login(email, password, callback) {
    dbClient.query(`SELECT * FROM customers
    WHERE email = '${email}' AND password = '${password}'`, (err, res) => {
        if (err) {
            callback(err, null);
            return;
        }
        if (res['rowCount'] == 1) {
            callback(null, res['rows'][0]);
        }
        else {
            callback(null, 'UserNotFound');
        }
    });
}

module.exports = login;