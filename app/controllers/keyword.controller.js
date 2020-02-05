const Keyword = require('../models/keyword.model');

// Create and Save a new Keyword
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Keyword title or position can not be empty"
        });
    }

    // Create a Keyword
    const keyword = new Keyword({
        title: req.body.title
    });

    // Save Keyword in the database
    keyword.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Keyword."
        });
    });

};

// Retrieve and return all keywords from the database.
exports.findAll = (req, res) => {
    Keyword.find()
    .then(keywords => {
        res.send(keywords);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving keywords."
        });
    });

};

// Find a single keyword with a keywordId
exports.findOne = (req, res) => {
    Keyword.findById(req.params.keywordId)
    .then(keyword => {
        if(!keyword) {
            return res.status(404).send({
                message: "Keyword not found with id " + req.params.keywordId
            });            
        }
        res.send(keyword);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Keyword not found with id " + req.params.keywordId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving keyword with id " + req.params.keywordId
        });
    });

};

// Update a keyword identified by the keywordId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Keyword title or position can not be empty"
        });
    }

    // Find keyword and update it with the request body
    Keyword.findByIdAndUpdate(req.params.keywordId, {
        title: req.body.title
    }, {new: true})
    .then(keyword => {
        if(!keyword) {
            return res.status(404).send({
                message: "Keyword not found with id " + req.params.keywordId
            });
        }
        res.send(keyword);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Keyword not found with id " + req.params.keywordId
            });                
        }
        return res.status(500).send({
            message: "Error updating keyword with id " + req.params.keywordId
        });
    });

};

// Delete a keyword with the specified keywordId in the request
exports.delete = (req, res) => {
    Keyword.findByIdAndRemove(req.params.keywordId)
    .then(keyword => {
        if(!keyword) {
            return res.status(404).send({
                message: "Keyword not found with id " + req.params.keywordId
            });
        }
        res.send({message: "Keyword deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Keyword not found with id " + req.params.keywordId
            });                
        }
        return res.status(500).send({
            message: "Could not delete keyword with id " + req.params.keywordId
        });
    });

};
