var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://main:main@cluster0.gyqur.mongodb.net/main?retryWrites=true&w=majority", { useNewUrlParser: true }
);
var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname));

app.use(express.static("public"));

app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/public/style.css");
  });

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/exercise', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/exercise.html'));
});

app.get('/stats', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/stats.html'));
});



var nameSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});
var User = mongoose.model("User", nameSchema);
user = User({
firstName: 'My Name',
lastName: 'lastName'
})
console.log(user)
 
user.save().then(() => console.log('Done'))




app.get('/', function(req, res) {
    res.send('/index.html');
});

app.get('/exercise', function(req, res) {
    res.send('/exercise.html');
});

app.get('/stats', function(req, res) {
    res.send('/stats.html');
});

app.listen(3000);
