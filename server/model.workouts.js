const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    type: String,
    name: String,
    distance: String,
    weight: String,
    sets: String,
    reps: String,
    duration: String
});

const workoutSchema = mongoose.Schema({
    exercises: [exerciseSchema]
  } ,
  { timestamps: true });

  var Workout = mongoose.model("Workout", workoutSchema);
  module.exports = Workout;