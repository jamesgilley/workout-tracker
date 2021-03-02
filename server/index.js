require('./db');
const path = require('path');
const express = require('express');
const ServeStatic = require('serve-static');
const bodyParser = require('body-parser');
const workoutsRouter = require('./router.workouts');


const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.json());
app.use('/api/workouts', workoutsRouter)

const serveStatic = ServeStatic(path.join(__dirname, '..', 'public'), { extensions: ['html']})
app.use(serveStatic);

app.listen(PORT, () => console.log('server listening on port', PORT));
