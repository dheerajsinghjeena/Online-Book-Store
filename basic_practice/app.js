var express = require('express');
const app = express();  
app.set('view engine', 'ejs'); 

app.get('/', function(req, res){
    // res.send("hello world"); 
    res.render('index');
})

app.listen(8088); 