const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userLogin = require('./routes/users-routes');
const results = require('./routes/result-routes');

const app = express();

dotenv.config();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methos', 'GET, POST, PATCH, PUT, DELETE');
    next();
});


app.use('/user', userLogin);
app.use('/result', results);

app.use((req, res, next) => {
    next(error);
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500)
    .send({message: error.message || 'Unknown error' });
});

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.utp8b.mongodb.net/React?retryWrites=true&w=majority`;
const options = { useUnifiedTopology: true, useNewUrlParser: true };

mongoose
    .connect(uri, options)
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });
