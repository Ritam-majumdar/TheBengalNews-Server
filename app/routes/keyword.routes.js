module.exports = (app) => {
    const keywords = require('../controllers/keyword.controller.js');

    // Create a new Keyword
    app.post('/keywords', keywords.create);

    // Retrieve all Keywords
    app.get('/keywords', keywords.findAll);

    // Retrieve a single Keyword with keywordId
    app.get('/keywords/:keywordId', keywords.findOne);

    // Update a Keyword with keywordId
    app.put('/keywords/:keywordId', keywords.update);

    // Delete a Keyword with keywordId
    app.delete('/keywords/:keywordId', keywords.delete);
}