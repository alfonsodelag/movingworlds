const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const ShortUrl = require('./models/shortUrl');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './variables.env' });
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT;
const frontEndLink = process.env.FRONTEND_LINK;

connectDB();

app.get('/latest', async (req, res) => {
    const shortUrls = await ShortUrl.find().sort({ _id: -1 }).limit(10);
    res.send(shortUrls);
});

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl });
    res.redirect(frontEndLink);
});

const getShortUrl = async (req, res, next) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404);
    req.shortUrl = shortUrl;
    next();
}

app.get('/:shortUrl', getShortUrl, async (req, res) => {
    const shortUrl = req.shortUrl;

    shortUrl.clicks++
    shortUrl.last_access = new Date();
    shortUrl.save();
    res.redirect(shortUrl.full);
});


app.get('/:shortUrl/stats', getShortUrl, async (req, res) => {
    const shortUrl = req.shortUrl;

    res.send({
        short: shortUrl.short,
        registeredAt: shortUrl.registered_at,
        lastAccess: shortUrl.last_access,
        clicks: shortUrl.clicks,
    });
});

app.post('/:shortUrl/modify', getShortUrl, async (req, res) => {
    const shortUrl = req.shortUrl;
    if (req.body.changedName.length >= 4) {
        return await shortUrl.updateOne({ short: req.body.changedName });
    } else {
        res.sendStatus(400);
    }
    res.redirect(frontEndLink);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));



