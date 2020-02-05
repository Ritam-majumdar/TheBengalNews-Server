module.exports = (app) => {
    const mainMenus = require('../controllers/mMenu.controller');

    // Create a new MainMenu
    app.post('/mainMenus', mainMenus.create);

    // Retrieve all MainMenus
    app.get('/mainMenus', mainMenus.findAll);

    // Retrieve a single MainMenu with mainMenuId
    app.get('/mainMenus/:mainMenuId', mainMenus.findOne);

    // Update a MainMenu with mainMenuId
    app.put('/mainMenus/:mainMenuId', mainMenus.update);

    // Delete a MainMenu with mainMenuId
    app.delete('/mainMenus/:mainMenuId', mainMenus.delete);
}