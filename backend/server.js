const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const ShortUrl = require('./models/shortUrl');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'variables.env' });
const PORT = process.env.PORT;
var cors = require('cors')

app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));


connectDB();

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    // console.log("shortUrl", shortUrls);
    res.send(shortUrls);
})

app.post('/shortUrls', async (req, res) => {
    try {
        await ShortUrl.create({ full: req.body.fullUrl });
        res.sendStatus(200);
    } catch (error) {
        console.log(error.message);
    }
    res.redirect('/');
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404);

    shortUrl.clicks++
    shortUrl.save();
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));



