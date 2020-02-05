const mongoose = require('mongoose');

const KeywordSchema = mongoose.Schema({
    title: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Keyword', KeywordSchema);