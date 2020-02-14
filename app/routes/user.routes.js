module.exports = (app) => {
    const users = require('../controllers/user.controller');

    //Route for Signup
    app.post('/signup', users.signup);

    //Route for Login
    app.post('/login', users.login);

}