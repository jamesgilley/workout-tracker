const mongoose = require('mongoose');
const url = "mongodb+srv://main:main@cluster0.gyqur.mongodb.net/main?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

