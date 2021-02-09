var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://main:main@cluster0.gyqur.mongodb.net/main?retryWrites=true&w=majority", { useNewUrlParser: true }
);
var express = require('express');
var app = express();
var path = require('path');


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
    res.sendFile(path.join(__dirname + '/Develop/public/index.html'));
});

app.get('/exercise', function(req, res) {
    res.sendFile(path.join(__dirname + '/Develop/public/exercise.html'));
});

app.get('/stats', function(req, res) {
    res.sendFile(path.join(__dirname + '/Develop/public/stats.html'));
});

app.listen(3000);
