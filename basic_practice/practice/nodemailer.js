var nodeMailer = require('nodemailer'); 
var transport = nodeMailer.createTransport({
    host: 'smtp.gmail.com', //  simple mail transfer protocol
    port: 587, 
    secure: false, 
    requireTLS: true, // tls is a way to provide secure connection between a client and server 
    auth:
    {
        user: 'dheerajjeena930@gmail.com', 
        pass: 'dsqd bech syik uzfv'
    }
}); 

var mailOptions = {
    from: 'dheerajjeena930@gmail.com',
    to:   'dheerajjeena930@gmail.com', 
    subject: 'node mail', 
    text: "hello amit.. How are you?"
}

transport.sendMail(mailOptions, function(error, info){
    if(error){
        console.warn(error); 
    }

    else {
        console.warn ('email has been send', info.response); 
    }
})