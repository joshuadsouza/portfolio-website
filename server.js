const express = require("express");
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var mailer = require('./mailer.js');
require('dotenv').config();

app.get('/', function(req, res){
    res.render('index');
})

app.get('/peaking-kilimanjaro', function(req, res){
    res.render('kilimanjaro');
})

app.get('/elliott-hulse-transformation', function(req, res){
    res.render('transformation');
})

app.get('/experience', function(req, res){
    res.render('experience');
})

app.get('/relevant-courses', function (req, res){
    res.render('courses');
})

app.get('/contact-me', function(req, res){
    res.render('contact');
})

app.post('/contact-me', async function(req, res){
    var transporter = await mailer.construct_transporter();
    var data = {
        name: req.body.person_name,
        phone: req.body.phone_number,
        email_address: req.body.email,
        message: req.body.message
    }
    var complete = JSON.stringify(data);
    var mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL,
        subject: req.body.email_subject,
        text: complete
    };
    
    await mailer.send_email(transporter, mailOptions);
    res.json("Success");
    
})

app.get('/resume', function(req, res){
    //var file = __dirname + '/public/joshua_dsouza_resume.pdf'
    //res.download(file);
    res.render('resume');
})

app.post('/resume', async function(req, res){
    var transporter = await mailer.construct_transporter();
    var data = {
        name: req.body.person_name,
        email: req.body.email,
        phone: req.body.phone_number,
        company: req.body.company_name
    }
    var complete = JSON.stringify(data);
    require('./resume_log.js');
    var mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Joshua D'Souza Resume",
        text: "Thanks for the interest! Attached is a PDF version of my resume.",
        attachments: [{
            filename: 'joshua_dsouza_resume.pdf',
            path: __dirname + '/public/joshua_dsouza_resume.pdf',
            contentType: 'application/pdf'
        }], function (err, info){
            if(err){
                console.log(err);
            } else{
                console.log(info);
            }
        }
    }
    await mailer.send_email(transporter, mailOptions);
    res.json(req.body.email);
})

app.listen(3000, function(){
    console.log("Listening on port 3000");
})

