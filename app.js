var express = require('express');

// importing body parser module in bodyParser variable
var bodyParser = require('body-parser'); 

// this is to export router to our app.js
const router = require('./controller/controller');

const app = express();

var user = require("./db/config");
app.set('view engine', 'ejs');
app.use(express.static('views')); // this is allow to use inside folder


// it allow to access path for different folder 
const path = require('path'); 
app.use(express.static(path.join(__dirname, '/upload'))); 

// this allow our frontend to connect to server 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); 


// when we want to create the server side requesting we generally use a content right side which is applied to the main document


// creating base url through router
app.use('/', router); 



app.listen(1818); 
