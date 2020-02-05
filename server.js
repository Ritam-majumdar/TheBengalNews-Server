const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

// create express app
const app = express();

app.use(cors());

// app.use('/uploads', express.static('uploads'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to The Bengal News Server."});
});

// Require Articles routes
require('./app/routes/article.routes')(app);

// Require MainMenus routes
require('./app/routes/mainMenu.routes')(app);

// Require DdMenu routes
require('./app/routes/ddMenu.routes')(app);

// Require Keyword routes
require('./app/routes/keyword.routes')(app);

// Require Upload routes
require('./app/routes/image-upload.routes')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
