require('dotenv').config()
const express = require('express');

const auth_routes = require('./routes/auth_routes.js');

const app = express();

app.use(express.json());
app.use('/api/auth/', auth_routes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const port = process.env.PORT || 5000;
app.listen(port);