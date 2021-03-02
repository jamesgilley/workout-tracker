const { Router } = require('express');
const Workouts = require('./model.workouts');

const workoutsRouter = new Router();

workoutsRouter.get('/', async (req, res) => {
    const workouts = await Workouts.find();
    res.json(workouts);
});

workoutsRouter.get('/range', async (req, res) => {
    const workouts = []
    const query = await Workouts.find().sort({ createdAt: -1 }).limit(7)

    query.forEach(obj => {
        const workout = obj.toObject();
        workout.totalDuration = workout.exercises
            .reduce((total, ex) => total + Number(ex.duration), 0);
        workouts.push(workout);
    })
    console.log(workouts.length, workouts[0]);
    res.json(workouts);
});

workoutsRouter.post('/', async (req, res) => {
    const workout = new Workouts();
    await workout.save();
    console.log(workout)
    res.json(workout);
});

workoutsRouter.put('/:_id', async (req, res) => {
    console.log(req.params.id, req.body);
    const { _id } = req.params;
    const workout = await Workouts.findOne({ _id });
    workout.exercises.push(req.body);
    await workout.save();
    res.json(workout);
});

module.exports = workoutsRouter;