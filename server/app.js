"use strict";
var express = require('express'),
    configSite = require('./config'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Account = require('./models/account'),
    bodyParser = require('body-parser'),
    multiparty = require('connect-multiparty'),

    app = express(),

    routes = require('./routes/index'),
    userRoutes = require('./routes/users'),
    apiRoutes = require('./routes/api'),
    fileUploadRoutes = require('./routes/upload'),
    imagesRoutes = require('./routes/images');


app.use(express.static(configSite.clientBuildDir));
app.use('/images/temp', express.static(configSite.temporaryImages));

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(multiparty({
    uploadDir: configSite.temporaryImages
}));

//Routes
app.use('/', routes);
app.use('/user', userRoutes);
app.use('/api', apiRoutes);
app.use('/upload', fileUploadRoutes);
app.use('/images', imagesRoutes);

// passport config
passport.use(new LocalStrategy(Account.authenticate(), function () {
    //console.log( arguments );
}));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost/xchange');

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

});

module.exports = app;
