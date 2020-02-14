const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    title: String,
    titleEnglish: String,
    author: String,
    place: String,
    mMenu: String,
    ddMenu: String,
    youtubeLink: String,
    content: String,
    imageCaption: String,
    articleImage: String,
    topNews: Boolean,
    topNewsDdMenu: Boolean,
    flashNews: Boolean,
    keywords: [String],
    dateBengali: String,
    views: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Article', ArticleSchema);
