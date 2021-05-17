const mongoose = require('mongoose');
const User = require('../models/user-model');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    const {username, password} = req.body;
    let user;
    try {
        user = await User.findOne({username: username});
    } catch (error) {
        res.status(422).send({message: 'Login failed!'});
        return next(error);
    };
    if (!user || user.password !== password) {
        res.status(404).send({message: 'Wrong password or username.'})
        return;
    };
    let token;
    try {
        token = jwt.sign({username: user.username}, 'testisalasana', {expiresIn: '1h'});
    } catch (error) {
        return error;
    }
    res.json({token: token, fname: user.fname, lname: user.lname, username: username, pro: user.pro});
};

const signup = async (req, res, next) => {
    const {fname, lname, email, username, password, pro} = req.body;
    const createUser = new User({
        fname: fname,
        lname: lname,
        email: email,
        username: username,
        password: password,
        pro: pro
    });
    try {
        await createUser.save();
    } catch (error) {
        return next(error);
    }
    console.log('New user created!')
    let token;
    try {
        token = jwt.sign({username: createUser.username}, 'testisalasana', {expiresIn: '1h'});
    } catch (error) {
        return error;
    }
    res.json({token: token, username: createUser.username});
};

exports.login = login;
exports.signup = signup;
