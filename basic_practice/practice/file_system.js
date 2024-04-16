// using file system 
// var http = require('http'); 
// var fs = require('fs'); 

// http.createServer(function(req, res){
//     // .readFile is used to read a particular file
//     fs.readFile('text.txt',function(err, data){
//         res.writeHead(200, {'Content-Type': 'text/html'}); 
//         res.write(data); 
//         return res.end(); 
//     })
// }).listen(1234); 

// using file system append 
// var http = require('http'); 
// var fs = require('fs');

// http.createServer(function(req,res){
//     fs.appendFile('mynewfile2.txt', 'Hello content!', function (err) {
//         if (err) throw err;
//         res.write('Saved!');
//         return res.end();   
//       });
// }).listen(4444); 

// using file system to open a file
// var fs = require('fs');

// fs.open('mynewfile3.txt', 'w', function (err, file) {
//   if (err) throw err;
//   console.log('Saved!');
// });

// this will write text to the file described file
// fs.writeFile('mynewfile3.txt', "hello world ", function(err){
//     if(err) throw err; 
//     console.log('saved'); 
// });

// this will delete an existing file
// var fs = require('fs'); 
// fs.unlink('rename_file.txt', function(err){
//     if(err) throw err; 
//     console.log('file deleted'); 
// });

// file rename 
// var fs = require('fs');

// fs.rename('mynewfile3.txt', 'rename_file.txt', function(err){
//     if(err) throw err; 
//     console.log("file is renamed"); 
// });
