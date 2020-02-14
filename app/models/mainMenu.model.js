const mongoose = require('mongoose');

const MainMenuSchema = mongoose.Schema({
    title: String,
    titleEnglish: String,
    position: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('MainMenu', MainMenuSchema);