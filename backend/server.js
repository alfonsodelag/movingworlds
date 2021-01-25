const express = require('express');
const app = express();
const connectDB = require('./config/db');
require('dotenv').config({ path: 'variables.env' });
const PORT = process.env.PORT;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

connectDB();


app.post('/create', (req, res) => {
    const body = req.body;
    console.log(body);
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));



