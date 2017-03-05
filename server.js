var express = require('express');
var env = require('./config/env');
var fs = require('fs');

var app = module.exports = express();

// parsing request body to JSON
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set client token authentication
app.set('tokenSecret', env.tokenSecret);

// authorization middleware
/*
var authToken = require('./config/middlewares/authorization');
app.use(authToken);
*/

// routes
var api = require('./app/routes/api');
var namespace = env.env == 'production' ? '/' : '/api';

app.use(namespace, api);

// handling errors
var errorsHandler = require('./app/routes/errors');
app.use(errorsHandler);

app.listen(env.port, function() {
  console.log('Server running on port ' + env.port);
});
