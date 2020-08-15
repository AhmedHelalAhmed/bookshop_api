const db_client = require('./db_config.js');

function signup(user, callback) {
    db_client.query(`INSERT INTO customers (name, email, password) 
    VALUES ('${user.name}', '${user.email}', '${user.password}');`,
        (err) => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
}

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

module.exports.signup = signup;
module.exports.login = login;