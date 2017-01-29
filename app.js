/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();
app.use(cookieParser());
app.use(session({resave: 'true',saveUninitialized: 'true', secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
    // done(null, user);
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    // user.className = "_User";
    // user =  Parse.Object.fromJSON(user);
    done(null, obj);
});

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
