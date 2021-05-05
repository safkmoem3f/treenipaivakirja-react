const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProModelSchema = new Schema({
    pvm: {type: String},
    yht: {type: Number},
    lkm: {type: Number}
}, {collection: 'professional'});

var AmateurModelSchema = new Schema({
    pvm: {type: String},
    yht: {type: Number},
    lkm: {type: Number}
}, {collection: 'amateur'});

var PersonalModelSchema = new Schema({
    username: {type: String, required: true},
    pvm: {type: String, required: true},
    laji: {type: String, required: true},
    krt: {type: Number, required: true},
    paino: {type: Number}
}, {collection: 'personal'});

const proSchema = mongoose.model('Pro', ProModelSchema);
const amateurSchema = mongoose.model('Amateur', AmateurModelSchema);
const personalSchema = mongoose.model('Personal', PersonalModelSchema);

module.exports = {Pro: proSchema, Amateur: amateurSchema, Personal: personalSchema};
