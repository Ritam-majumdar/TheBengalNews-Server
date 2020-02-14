const checkAuth = require('../middleware/check-auth');
module.exports = (app) => {
    const articles = require('../controllers/article.controller.js');

    // Create a new Article
    app.post('/articles', checkAuth, articles.create);

    // Retrieve all Articles
    app.get('/articles', articles.findAll);

    // Retrieve a single Article with articleId
    app.get('/articles/:articleId', articles.findOne);

    // Retrieve all Articles with Main & DD Menu
    app.get('/articlesMenu/:mMenu/:ddMenu', articles.findByMenu);

    app.get('/article/:title',articles.findByTitle);

    // Update a Article with articleId
    app.put('/articles/:articleId', articles.update);

    // Delete a Article with articleId
    app.delete('/articles/:articleId', articles.delete);
}