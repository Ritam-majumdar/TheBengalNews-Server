const MainMenu = require('../models/mainMenu.model');

// Create and Save a new MainMenu
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title || !req.body.position) {
        return res.status(400).send({
            message: "MainMenu title or position can not be empty"
        });
    }

    // Create a MainMenu
    const mainMenu = new MainMenu({
        title: req.body.title,
        titleEnglish: req.body.titleEnglish,
        position: req.body.position
    });

    // Save MainMenu in the database
    mainMenu.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the MainMenu."
        });
    });

};

// Retrieve and return all mainMenus from the database.
exports.findAll = (req, res) => {
    MainMenu.find()
    .then(mainMenus => {
        res.send(mainMenus.sort((a, b) => a.position - b.position));
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving mainMenus."
        });
    });

};

// Find a single mainMenu with a mainMenuId
exports.findOne = (req, res) => {
    MainMenu.findById(req.params.mainMenuId)
    .then(mainMenu => {
        if(!mainMenu) {
            return res.status(404).send({
                message: "MainMenu not found with id " + req.params.mainMenuId
            });            
        }
        res.send(mainMenu);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "MainMenu not found with id " + req.params.mainMenuId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving mainMenu with id " + req.params.mainMenuId
        });
    });

};

// Update a mainMenu identified by the mainMenuId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.title || !req.body.position) {
        return res.status(400).send({
            message: "MainMenu title or position can not be empty"
        });
    }

    // Find mainMenu and update it with the request body
    MainMenu.findByIdAndUpdate(req.params.mainMenuId, {
        title: req.body.title,
        titleEnglish: req.body.titleEnglish,
        position: req.body.position,
    }, {new: true})
    .then(mainMenu => {
        if(!mainMenu) {
            return res.status(404).send({
                message: "MainMenu not found with id " + req.params.mainMenuId
            });
        }
        res.send(mainMenu);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "MainMenu not found with id " + req.params.mainMenuId
            });                
        }
        return res.status(500).send({
            message: "Error updating mainMenu with id " + req.params.mainMenuId
        });
    });

};

// Delete a mainMenu with the specified mainMenuId in the request
exports.delete = (req, res) => {
    MainMenu.findByIdAndRemove(req.params.mainMenuId)
    .then(mainMenu => {
        if(!mainMenu) {
            return res.status(404).send({
                message: "MainMenu not found with id " + req.params.mainMenuId
            });
        }
        res.send({message: "MainMenu deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "MainMenu not found with id " + req.params.mainMenuId
            });                
        }
        return res.status(500).send({
            message: "Could not delete mainMenu with id " + req.params.mainMenuId
        });
    });

};
