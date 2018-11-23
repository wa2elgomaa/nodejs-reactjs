// modules
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var mailAccountUser = 'w.gom3a@gmail.com'
var mailAccountPassword = '@B01899eb'


exports.send = (mail ,callback)=>{

    var transport = nodemailer.createTransport(smtpTransport({ 
        host: 'smtp.gmail.com', 
        port: 465, 
        secure: true, 
        service: 'Gmail',
        auth: { user: mailAccountUser, pass: mailAccountPassword }, 
        tls: { rejectUnauthorized: false } 
    }));

    transport.sendMail(mail, function(err, res){
        if(err){
            console.log(err);
        }else{
            console.log("Message sent: " + res.message);
        }
        transport.close();
        callback && callback(err , res);
    });
}