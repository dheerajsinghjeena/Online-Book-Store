// in this will use basic express file
var express=require('express'); 

const app=express(); 

// app.get('/', function(req,res){
//     res.send('login page 3543');
// })

// app.get('/about-us', function(req, res){
//     res.send('this is about-us page');
// })

// app.get('/contact-us', function(req, res){
//     res.send('this is contact-us page');
// })

// app.listen(2300); 

// in this we will use router
var router = express.Router(); 

router.get('/', function(req, res){
    res.sendFile(__dirname+"/index.html"); 
})

router.get('/about-us', function(req, res){
    res.sendFile(__dirname+"/about-us.html"); 
})

app.use('/', router);
app.listen(2300); 
