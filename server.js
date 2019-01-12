const express = require("express");
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get('/', function(req, res){
    res.render('index');
})

app.get('/peaking-kilimanjaro', function(req, res){
    res.render('kilimanjaro');
})

app.get('/elliott-hulse-transformation', function(req, res){
    res.render('transformation');
})

app.get('/my-experience', function(req, res){
    res.render('experience');
})

app.listen(3000, function(){
    console.log("Listening on port 3000");
})