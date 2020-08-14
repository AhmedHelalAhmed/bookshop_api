require('dotenv').config()
const {Client } = require('pg')

const db_client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
  host: process.env.DB_HOST,
  ssl: true
});

db_client.connect();

module.exports = db_client;