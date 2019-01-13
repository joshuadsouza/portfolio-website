//get nodemailer
var nodemailer = require('nodemailer');
//exports
var exports = module.exports = {};
//Get dotenv file
require('dotenv').config();

exports.construct_transporter = async() => {
    //create the transporter
    return new Promise( (resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        resolve(transporter);
    })
}

//function to send retreive results from the page and send an e-mail
exports.send_email = async(transporter, mailOptions) => {
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        } else{
            console.log('E-mail Sent Successfully.' + info.response);
        }
    })
}