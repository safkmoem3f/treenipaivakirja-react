const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userLogin = require('./routes/users-routes');
const results = require('./routes/result-routes');

const app = express();

app.use(bodyParser.json());

var whitelist = ['https://treenipaivakirja-backend.herokuapp.com/user', 'https://treenipaivakirja-backend.herokuapp.com/result']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

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

const uri = "mongodb+srv://melinda:6sVHZopgGiTgdC7L@cluster0.utp8b.mongodb.net/React?retryWrites=true&w=majority";
const options = { useUnifiedTopology: true, useNewUrlParser: true };

mongoose
    .connect(uri, options)
    .then(() => {
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => {
        console.log(err);
    });
