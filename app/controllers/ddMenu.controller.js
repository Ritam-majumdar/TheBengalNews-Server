const DdMenu = require('../models/ddMenu.model');

// Create and Save a new DdMenu
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title || !req.body.position || !req.body.mainMenu) {
        return res.status(400).send({
            message: "DdMenu title or position or MainMenu can not be empty"
        });
    }

    // Create a DdMenu
    const ddMenu = new DdMenu({
        title: req.body.title,
        titleEnglish: req.body.titleEnglish,
        position: req.body.position,
        mainMenu: req.body.mainMenu
    });

    // Save DdMenu in the database
    ddMenu.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the DdMenu."
        });
    });

};

// Retrieve and return all ddMenus from the database.
exports.findAll = (req, res) => {
    DdMenu.find()
    .then(ddMenus => {
        res.send(ddMenus.sort((a, b) => b.position - a.position));
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving ddMenus."
        });
    });

};

// Find a single ddMenu with a ddMenuId
exports.findOne = (req, res) => {
    DdMenu.findById(req.params.ddMenuId)
    .then(ddMenu => {
        if(!ddMenu) {
            return res.status(404).send({
                message: "DdMenu not found with id " + req.params.ddMenuId
            });            
        }
        res.send(ddMenu);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "DdMenu not found with id " + req.params.ddMenuId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving ddMenu with id " + req.params.ddMenuId
        });
    });

};

// Update a ddMenu identified by the ddMenuId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.title || !req.body.position || !req.body.mainMenu) {
        return res.status(400).send({
            message: "DdMenu title or position or MainMenu can not be empty"
        });
    }

    // Find ddMenu and update it with the request body
    DdMenu.findByIdAndUpdate(req.params.ddMenuId, {
        title: req.body.title,
        titleEnglish: req.body.titleEnglish,
        position: req.body.position,
        mainMenu: req.body.mainMenu
    }, {new: true})
    .then(ddMenu => {
        if(!ddMenu) {
            return res.status(404).send({
                message: "DdMenu not found with id " + req.params.ddMenuId
            });
        }
        res.send(ddMenu);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "DdMenu not found with id " + req.params.ddMenuId
            });                
        }
        return res.status(500).send({
            message: "Error updating ddMenu with id " + req.params.ddMenuId
        });
    });

};

// Delete a ddMenu with the specified ddMenuId in the request
exports.delete = (req, res) => {
    DdMenu.findByIdAndRemove(req.params.ddMenuId)
    .then(ddMenu => {
        if(!ddMenu) {
            return res.status(404).send({
                message: "DdMenu not found with id " + req.params.ddMenuId
            });
        }
        res.send({message: "DdMenu deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "DdMenu not found with id " + req.params.ddMenuId
            });                
        }
        return res.status(500).send({
            message: "Could not delete ddMenu with id " + req.params.ddMenuId
        });
    });

};
