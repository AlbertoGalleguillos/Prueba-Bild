'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Company, Lapse, Role
var FormSchema = new Schema({
    name: String,
    inputs: { 
        company: {type: String},
        type: {type: String},
        required: {type: Boolean}
    }
});

module.exports = mongoose.model('Forms', FormSchema);
