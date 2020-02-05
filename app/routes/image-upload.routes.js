module.exports = (app) => {
    const uploadRoute = require('../controllers/uploadController.controller.js');

    const multipart = require('connect-multiparty');
    const multipartMiddleware = multipart({ uploadDir: './uploads' });


    // Create a new Image Upload
    app.post('/upload', multipartMiddleware, uploadRoute.create);
}