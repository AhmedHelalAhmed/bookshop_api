const {Client } = require('pg')

const db_client = new Client({
  user: 'fdsvlhrubrdweg',
  password: '94247ff8641036bc51c39b65b9a584987fe70bcc52818749ef3c4808663e1678',
  database: 'd6hvdjt8kvvpmv',
  port: 5432,
  host: 'ec2-54-247-94-127.eu-west-1.compute.amazonaws.com',
  ssl: true
});

module.exports = db_client;