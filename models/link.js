const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const linkSchema = new Schema({
    locationUrl: String,
    shortenedUrl: String,
    viewCount: {type: Number, min: 0}
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;