const express = require('express');
const userRouter = require('./routes/user.router');
require('dotenv').config()

const app =  express();

app.use(express.json());

app.use(userRouter);


app.get('/', (req, res) => {
res.send('Bienvenido ami servidor');
});




    module.exports = app