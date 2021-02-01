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

app.get('/api/latest', async (req, res) => {
    const shortUrls = await ShortUrl.find().sort({ _id: -1 }).limit(10);
    res.send(shortUrls);
});

app.post('/api/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl });
    res.status(201).redirect(frontEndLink);
});

const getShortUrl = async (req, res, next) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404);
    req.shortUrl = shortUrl;
    next();
}

app.get('/api/:shortUrl', getShortUrl, async (req, res) => {
    const shortUrl = req.shortUrl;

    shortUrl.clicks++
    shortUrl.last_access = new Date();
    shortUrl.save();
    res.redirect(shortUrl.full);
});


function toJson(shortUrl) {
    return {
        short: shortUrl.short,
        registeredAt: shortUrl.registered_at,
        lastAccess: shortUrl.last_access,
        clicks: shortUrl.clicks,
    };
}

app.get('/api/:shortUrl/stats', getShortUrl, async (req, res) => {
    const shortUrl = req.shortUrl;
    res.send(toJson(shortUrl));
});

app.post('/api/:shortUrl/modify', getShortUrl, async (req, res) => {
    const shortUrl = req.shortUrl;

    const changedName = req.body && req.body.changedName;
    if (!changedName || !changedName.length || changedName.length < 4) {
        return res.sendStatus(400)
    }

    const existingShortUrl = await ShortUrl.findOne({ short: changedName });
    if (existingShortUrl) {
        return res.sendStatus(409);
    }

    try {
        await shortUrl.updateOne({ short: changedName });
        return res.send(toJson(shortUrl));
    } catch {
        return res.sendStatus(500);
    }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

module.exports = app;