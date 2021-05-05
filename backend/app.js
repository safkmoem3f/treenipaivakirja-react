const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cacheControl = require('express-cache-controller');
const mongoose = require('mongoose');

const userLogin = require('./routes/users-routes');
const results = require('./routes/result-routes');

const app = express();

app.use(bodyParser.json());

app.use(cacheControl());
app.use(cors());

app.use('/user', userLogin);
app.use('/result', results);

app.use((req, res, next) => {
    return next(error);
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500)
    .send({message: error.message || 'Unknown error' });
});

app.use(express.static(path('../build')))
app.get('*', (req, res) => {
    res.sendFile(path('../build'))
})

const uri = "mongodb+srv://melinda:6sVHZopgGiTgdC7L@cluster0.utp8b.mongodb.net/React?retryWrites=true&w=majority";
const options = { useUnifiedTopology: true, useNewUrlParser: true };

mongoose
    .connect(uri, options)
    .then(() => {
        app.listen(process.env.PORT || 5000);
    })
    .catch(err => {
        console.log(err);
    });
