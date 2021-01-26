const mongoose = require('mongoose');
const shortId = require('shortid');

const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate,
        unique: true
    },
    registered_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    last_access: {
        type: Date,
        default: "",
        required: false
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);

