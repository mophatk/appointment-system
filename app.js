const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var flash = require('connect-flash');
const path = require('path');

const app = express();

const playerRoutes = require('./routes/player.routes');
const homeRoutes = require('./routes/index.routes');
//const userRoutes = require('./routes/user.routes');
const port = 2000;


// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'socka'
});


// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app
app.use('/', homeRoutes);
app.use('/student', playerRoutes);
app.use('/appointment', playerRoutes);
app.use('/admin', homeRoutes);
app.use('/admin2', homeRoutes);
app.use('/signup', homeRoutes);

app.use(flash());
//app.use('/login', userRoutes);
app.get('*', function(req, res, next){
    res.status(404);

    res.render('404.ejs', {
        title: "Page Not Found",
    });

});

// Logout user
app.get('/', function (req, res) {
    delete req.session;
    req.flash('success', 'Login Again Here');
    res.redirect('/login');
  });

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    
});