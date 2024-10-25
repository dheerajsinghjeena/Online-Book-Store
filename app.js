var express = require('express');
var bodyParser = require('body-parser'); 
const router = require('./controller/controller');
var user = require("./db/config");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('views')); 

const path = require('path'); 
app.use(express.static(path.join(__dirname, '/upload'))); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); 


app.use('/', router); 
port = 1100;

app.listen(port, ()=>{
    console.log('Port running on: ', port)
}); 
