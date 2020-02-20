const mongoose = require('mongoose');

const SocialMediaSchema = mongoose.Schema({
    app: String,
    link: String

}, {
    timestamps: true
});

module.exports = mongoose.model('SocialMedia', SocialMediaSchema);