var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://main:main@cluster0.gyqur.mongodb.net/main?retryWrites=true&w=majority", { useNewUrlParser: true }
);
var express = require('express');
var app = express();
var path = require('path');
app.use(express.urlencoded());
const cors = require('cors');
app.use(express.json());
app.use(cors());


/* //create userSchema and Model
var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  userEmail: String
} ,
{ timestamps: true });

userSchema.method("toJSON", function() {
   const { __v, _id, ...object } = this.toObject();
   object.id = _id;
   return object;
 });

var User = mongoose.model("User", userSchema);

//user routes

app.get("/users", (req, res ) => {
  User.find().then(users => {
      // console.log(users)
      res.send(users)
  })
})

app.delete("/users", (req, res) => {
  User.deleteMany({}, ()=>{
      console.log("all users deleted")
      res.send({msg: "all uers deleted"})
  })
})

app.post("/adduser", (req, res) => {
  // console.log(req.body)
  var myData = new User(req.body);
  myData.save()
      .then(item => {
          res.send(item);
      })
      .catch(err => {
          res.status(400).send("Unable to save to database");
      });
}); */

//create workout Schema and Model (made of exercises)
var workoutSchema = mongoose.Schema({
  type: String,
  name: String,
  distance: String,
  weight: String,
  sets: String,
  reps: String,
  duration: String,

} ,
{ timestamps: true });

workoutSchema.method("toJSON", function() {
   const { __v, _id, ...object } = this.toObject();
   object.id = _id;
   return object;
 });

var Workout = mongoose.model("Workout", workoutSchema);

// workout routes
app.get("/api/workouts", (req, res ) => {
  Workout.find({}).sort({createdAt: -1})
  .then(workouts => {
      console.log(workouts)
      res.send(workouts)
  })
})

app.delete("/api/workouts", (req, res) => {
  Workout.deleteMany({}, ()=>{
      console.log("all workouts deleted")
      res.send({msg: "all workouts deleted"})
  })
})

app.post("/api/addworkout", (req, res) => {
  console.log('server post /addworkout endpoint log.')
  console.log(req.body)
  var myData = new Workout(req.body);
  myData.save()
      .then(item => {
          res.send(item);
      })
      .catch(err => {
          res.status(400).send("Unable to save to database");
      }); 
});

app.delete("/api/workout/:id", (req, res) => {
  Workout.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
          return (error);
        } else {
          console.log("workout deleted")
          res.send({msg: "workout deleted"})
        }
  })
})

app.put("/api/workoutedit", (req, res) => {
  let id = ""
 // console.log('Edit happened2', req.body.name)
  //Workout.findByIdAndUpdate(req.params.id, { $set: req.body}, (error, data) => {
 Workout.findOne({name: req.body.name})
.then(myData => {
  Workout.findByIdAndUpdate(myData.id, req.body)
 .then(data => console.log(data, "success!!!"))
 .catch(err => console.log(err)) 
})
.catch(err => console.log(err))

console.log(id, "<=== this is id")


})


//express static
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

app.get('/update', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/update.html'));
});



const port = process.env.PORT || 3000;

app.listen(port, () => {
    "running server!"
})

//app.listen(3000, () => console.log("server is running!!!"));
