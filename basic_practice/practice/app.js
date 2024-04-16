// basic program in node js
var a = 23; 
var b = 44; 
var c = 32; 
var sum = a + b + c;
console.log(sum);
console.log("hello world"); 

var check = (a,b)=>{
    console.log(a+b);
};

check(a,b); 

// run on server side
// var http = require('http'); 
// http.createServer(function (req, res){
//     res.write('<h1> Hello my name is dheeraj </h1>');
//     res.write('this is our server side scripting'); 
//     res.end(); // this will the ending part 
// }).listen(1800); // port number will always be a 4 digit number 
// run the above program using localhost:1800/...... it will run our program in server
 
// CREATING OUR OWN MODULE
// call the created module
// var add = require('./own_module'); 
// console.log(add(10, 100)); 

var http = require('http');
var dt = require('./own_module');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The date and time are currently: " + dt.myDateTime());
  res.end();
}).listen(8080);
