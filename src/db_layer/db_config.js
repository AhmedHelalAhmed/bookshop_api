const {Client } = require('pg')

const db_client = new Client({
  user: 'hnijjbqeloctyd',
  password: '482650b68c0d781dc29c1591a2697caa54d4a994ce4932c2673070919db40018',
  database: 'dceialcdrq2l6t',
  port: 5432,
  host: 'ec2-54-247-118-139.eu-west-1.compute.amazonaws.com',
  ssl: true
});

module.exports = db_client;