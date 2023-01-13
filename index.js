const express = require('express');
const app = express();

const path = require('path');

const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');

// session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// view engine
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout/layout');

// body-parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// dotenv
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// db
require('./app/config/db')();

// middlewares
const isAdmin = require('./app/middleware/isAdmin');

// include route
app.use(require('./app/routes/router.authentication'));

// authorization middleware
// app.use(isAdmin);

// set layout
app.use(expressLayouts);

// protected routes
app.use('/user', require('./app/routes/router.user'));

app.listen(PORT, () =>{
    console.log(`App Listening on PORT ${PORT}`);
});