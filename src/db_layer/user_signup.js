const dbClient = require('./db_config.js');

function signup(user, callback) {
    dbClient.connect();
    dbClient.query(`INSERT INTO customers (name, email, password) 
    VALUES ('${user.name}', '${user.email}', '${user.password}');`,
        (err) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
}

module.exports = signup;