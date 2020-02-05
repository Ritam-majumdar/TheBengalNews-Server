const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    title: String,
    author: String,
    place: String,
    mMenu: String,
    ddMenu: String,
    youtubeLink: String,
    content: String,
    articleImage: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Article', ArticleSchema);
