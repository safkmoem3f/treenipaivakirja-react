const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
    uid: {type: String},
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true, minlength: 5},
    pro: {type: String, required: true}
}, {collection: 'users'});

module.exports = mongoose.model('User', UserModelSchema);
