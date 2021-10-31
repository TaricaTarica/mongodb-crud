require('dotenv').config()
const cors = require('cors');
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

var app = express();
app.use(express.json())
app.use(cors())
routes(app);

mongoose.connect(process.env.DB_CONNECTION, () => 
    console.log('Connected to database!')
);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(new Date() + " Server started at port " + process.env.APP_PORT);
});