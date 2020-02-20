const SocialMedia = require('../models/socialMedia.model');

// Create and Save a new SocialMedia
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title || !req.body.position) {
        return res.status(400).send({
            message: "SocialMedia title or position can not be empty"
        });
    }

    // Create a SocialMedia
    const socialMedia = new SocialMedia({
        app: req.body.app,
        link: req.body.link
    });

    // Save SocialMedia in the database
    socialMedia.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the SocialMedia."
        });
    });

};

// Retrieve and return all socialMedias from the database.
exports.findAll = (req, res) => {
    SocialMedia.find()
    .then(socialMedias => {
        res.send(socialMedias.sort((a, b) => a.position - b.position));
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving socialMedias."
        });
    });

};

// Find a single socialMedia with a socialMediaId
exports.findOne = (req, res) => {
    SocialMedia.findById(req.params.socialMediaId)
    .then(socialMedia => {
        if(!socialMedia) {
            return res.status(404).send({
                message: "SocialMedia not found with id " + req.params.socialMediaId
            });            
        }
        res.send(socialMedia);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "SocialMedia not found with id " + req.params.socialMediaId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving socialMedia with id " + req.params.socialMediaId
        });
    });

};

// Update a socialMedia identified by the socialMediaId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.title || !req.body.position) {
        return res.status(400).send({
            message: "SocialMedia title or position can not be empty"
        });
    }

    // Find socialMedia and update it with the request body
    SocialMedia.findByIdAndUpdate(req.params.socialMediaId, {
        app: req.body.app,
        link: req.body.link
    }, {new: true})
    .then(socialMedia => {
        if(!socialMedia) {
            return res.status(404).send({
                message: "SocialMedia not found with id " + req.params.socialMediaId
            });
        }
        res.send(socialMedia);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "SocialMedia not found with id " + req.params.socialMediaId
            });                
        }
        return res.status(500).send({
            message: "Error updating socialMedia with id " + req.params.socialMediaId
        });
    });

};

// Delete a socialMedia with the specified socialMediaId in the request
exports.delete = (req, res) => {
    SocialMedia.findByIdAndRemove(req.params.socialMediaId)
    .then(socialMedia => {
        if(!socialMedia) {
            return res.status(404).send({
                message: "SocialMedia not found with id " + req.params.socialMediaId
            });
        }
        res.send({message: "SocialMedia deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "SocialMedia not found with id " + req.params.socialMediaId
            });                
        }
        return res.status(500).send({
            message: "Could not delete socialMedia with id " + req.params.socialMediaId
        });
    });

};
