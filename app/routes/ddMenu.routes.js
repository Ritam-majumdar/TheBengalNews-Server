module.exports = (app) => {
    const ddMenus = require('../controllers/ddMenu.controller.js');

    // Create a new DropDownMenu
    app.post('/ddMenus', ddMenus.create);

    // Retrieve all DropDownMenus
    app.get('/ddMenus', ddMenus.findAll);

    // Retrieve a single DropDownMenu with ddMenuId
    app.get('/ddMenus/:ddMenuId', ddMenus.findOne);

    // Update a DropDownMenu with ddMenuId
    app.put('/ddMenus/:ddMenuId', ddMenus.update);

    // Delete a DropDownMenu with ddMenuId
    app.delete('/ddMenus/:ddMenuId', ddMenus.delete);
}