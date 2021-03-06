const mongoose = require('mongoose');
const shortId = require('shortid');

// Add index to registered_at

const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: () => shortId.generate().substring(3),
        unique: true
    },
    registered_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    last_access: {
        type: Date,
        default: null,
        required: false
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);

