const mongoose = require('mongoose');
const { Pro, Amateur, Personal } = require('../models/result-model');

const findAllPro = async (req, res, next) => {
    let results;
    try {
        results = await Pro.find();
    } catch (error) {
        return next(error);
    };
    res.json(results);
};

const findAllAmateur = async (req, res, next) => {
    let results;
    try {
        results = await Amateur.find();
    } catch (error) {
        return next(error);
    };
    res.json(results);
};

const findAllPersonal = async (req, res, next) => {
    let results;
    try {
        results = await Personal.find();
    } catch (error) {
        return next(error);
    };
    res.json(results);
};

const findPersonal = async (req, res, next) => {
    const {username} = req.body;
    let results;
    try {
        results = await Personal.find({uid: username});
    } catch (error) {
        return next(error);
    };
    res.json(results)
}

exports.findAllPro = findAllPro;
exports.findAllAmateur = findAllAmateur;
exports.findAllPersonal = findAllPersonal;
exports.findPersonal = findPersonal;
