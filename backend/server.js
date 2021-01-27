const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const ShortUrl = require('./models/shortUrl');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'variables.env' });
const PORT = process.env.PORT;
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));


connectDB();

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.send(shortUrls);
});

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl });
    res.redirect('http://localhost:3000');
});


app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404);

    shortUrl.clicks++
    shortUrl.last_access = new Date();
    shortUrl.save();
    res.redirect(shortUrl.full);
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));



