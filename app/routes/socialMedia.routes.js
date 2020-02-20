module.exports = (app) => {
    const socialMedia = require('../controllers/mMenu.controller');

    // Create a new SocialMedia
    app.post('/socialMedia', socialMedia.create);

    // Retrieve all SocialMedias
    app.get('/socialMedia', socialMedia.findAll);

    // Retrieve a single SocialMedia with socialMediaId
    app.get('/socialMedia/:socialMediaId', socialMedia.findOne);

    // Update a SocialMedia with socialMediaId
    app.put('/socialMedia/:socialMediaId', socialMedia.update);

    // Delete a SocialMedia with socialMediaId
    app.delete('/socialMedia/:socialMediaId', socialMedia.delete);
}