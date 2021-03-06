'use strict'

// Requires
var express = require('express');
var bodyParser = require('body-parser');

// mssql
var mssql = require('mssql');
var http = require('http');
var path = require('path');

var app = express();

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS ");
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

// Import Routes
var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');
var loginRoutes = require('./routes/login');
var uploadhRoutes = require('./routes/upload');
var imageRoutes = require('./routes/image');
var addressRoutes = require('./routes/address');
var securityRoutes = require('./routes/security');
var sunatRoutes = require('./routes/sunat');
var excelRoutes = require('./routes/excel');
var pdfRoutes = require('./routes/pdf');
var searchRoutes = require('./routes/search');
var registerRoutes = require('./routes/register');

// Connetion BD MSSQL SERVER
app.set('view engine', 'ejs');

// Config BD
var config = {
    user: 'serval',
    // driver='tedious',
    password: 'Cybers@c1',
    server: '192.168.0.3',
    //port:
    database: 'SERVAL_APP'
};

// Test connection
var connection = mssql.connect(config, function(err, res){
    if (err){
        throw err;
    } else {         
        console.log('Base de datos \x1b[32m%s\x1b[0m','Online');    
        // Escuchar peticiones
    app.listen(3000, () => {
        console.log('Express Server Puerto: 3000: \x1b[32m%s\x1b[0m','Online');
    });    
    }
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/upload', uploadhRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/sunat', sunatRoutes);
app.use('/api/excel', excelRoutes);
app.use('/api/pdf', pdfRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/register', registerRoutes);

app.use('/api', appRoutes);
