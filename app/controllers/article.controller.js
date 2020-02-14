const Article = require('../models/article.model');



// Create and Save a new Article
exports.create = (req, res) => {
    // console.log(req.files);
    // Validate request
    // if (!req.body.content) {
    //     return res.status(400).send({
    //         message: "Article content can not be empty"
    //     });
    // }

    // Create a Article
    const article = new Article({
        title: req.body.title || "Untitled Article",
        titleEnglish: req.body.titleEnglish,
        author: req.body.author || "The Bengal News",
        place: req.body.place,
        mMenu: req.body.mMenu,
        ddMenu: req.body.ddMenu,
        youtubeLink: req.body.youtubeLink,
        content: req.body.content,
        articleImage: req.body.articleImage,
        imageCaption: req.body.imageCaption,
        topNews: req.body.topNews,
        topNewsDdMenu: req.body.topNewsDdMenu,
        flashNews: req.body.flashNews,
        keywords: req.body.keywords,
        dateBengali: req.body.dateBengali,
        views: req.body.views
    });

    // Save Article in the database
    article.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Article."
            });
        });

};

// Retrieve and return all articles from the database.
exports.findAll = (req, res) => {
    Article.find()
        .then(articles => {
            res.send(articles);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving articles."
            });
        });

};

// Find a single article with a articleId
exports.findOne = (req, res) => {
    Article.findById(req.params.articleId)
        .then(article => {
            if (!article) {
                return res.status(404).send({
                    message: "Article not found with id " + req.params.articleId
                });
            }
            res.send(article);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Article not found with id " + req.params.articleId
                });
            }
            return res.status(500).send({
                message: "Error retrieving article with id " + req.params.articleId
            });
        });

};

//Find articles for given menu
exports.findByMenu = (req, res) =>{
    Article.find({'mMenu': req.params.mMenu, 'ddMenu': req.params.ddMenu}).then(articlesMenu => {
        res.send(articlesMenu);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving articles."
        });
    });
};

//Find Flash News Articles 
exports.flashNews = (req, res) =>{
    Article.find({'flashNews': true}).then(flashnews => {
        res.send(flashnews);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving articles."
        });
    });
};

//Find article by title
exports.findByTitle = (req, res) =>{
    Article.find({'title': req.params.title}).then(article => {
        res.send(article);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving article."
        });
    });
};

// Update a article identified by the articleId in the request
exports.update = (req, res) => {
    // Validate Request
    // if (!req.body.content) {
    //     return res.status(400).send({
    //         message: "Article content can not be empty"
    //     });
    // }

    // Find article and update it with the request body
    Article.findByIdAndUpdate(req.params.articleId, {
        title: req.body.title || "Untitled Article",
        titleEnglish: req.body.titleEnglish,
        author: req.body.author || "The Bengal News",
        place: req.body.place,
        mMenu: req.body.mMenu,
        ddMenu: req.body.ddMenu,
        youtubeLink: req.body.youtubeLink,
        content: req.body.content,
        articleImage: req.body.articleImage,
        imageCaption: req.body.imageCaption,
        topNews: req.body.topNews,
        topNewsDdMenu: req.body.topNewsDdMenu,
        flashNews: req.body.flashNews,
        keywords: req.body.keywords,
        dateBengali: req.body.dateBengali,
        views: req.body.views
    }, { new: true })
        .then(article => {
            if (!article) {
                return res.status(404).send({
                    message: "Article not found with id " + req.params.articleId
                });
            }
            res.send(article);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Article not found with id " + req.params.articleId
                });
            }
            return res.status(500).send({
                message: "Error updating article with id " + req.params.articleId
            });
        });

};

// Delete a article with the specified articleId in the request
exports.delete = (req, res) => {
    Article.findByIdAndRemove(req.params.articleId)
        .then(article => {
            if (!article) {
                return res.status(404).send({
                    message: "Article not found with id " + req.params.articleId
                });
            }
            res.send({ message: "Article deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Article not found with id " + req.params.articleId
                });
            }
            return res.status(500).send({
                message: "Could not delete article with id " + req.params.articleId
            });
        });

};
