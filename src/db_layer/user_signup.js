const db_client = require('./db_config.js');

function signup(user, callback) {
    db_client.connect();
    db_client.query(`INSERT INTO users (name, email, password, phone_number, avatar, gender) 
    VALUES ('${user.name}', '${user.email}', '${user.password}',
     '${user.phoneNumber}', '${user.avatar}', '${user.gender}');`,
        (err) => {
            db_client.end();
            if (err) {
                callback(err);
                return;
            }
            callback(null);
        });
}

module.exports = signup;