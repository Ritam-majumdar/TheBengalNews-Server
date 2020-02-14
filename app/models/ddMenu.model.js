const mongoose = require('mongoose');

const DdMenuSchema = mongoose.Schema({
    title: String,
    titleEnglish: String,
    position: Number,
    mainMenu: String
}, {
    timestamps: true
});

module.exports = mongoose.model('DdMenu', DdMenuSchema);