const mongoose = require('mongoose');

const MainMenuSchema = mongoose.Schema({
    title: String,
    position: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('MainMenu', MainMenuSchema);