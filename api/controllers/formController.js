'use strict';

var mongoose = require('mongoose'),
    Form = mongoose.model('Forms');

exports.list_all_forms = function(req, res) {
    Form.find({}, function(err, form) {
        if (err)
            res.send(err);
        res.json(form);
    });
};

exports.create_form = function(req, res) {
    var new_form = new Form(req.body);
    new_form.save(function(err, form) {
        if (err)
            res.send(err);
        res.json(form);
    });
};

exports.read_a_form = function(req, res) {
    Form.findById(req.params.formId, function(err, form) {
        if (err)
            res.send(err);
        res.json(form);
    });
};

exports.update_a_form = function(req, res) {
    Form.findOneAndUpdate({_id: req.params.fomrId}, req.body, {new: true}, function(err, form) {
        if (err)
            res.send(err);
        res.json(form);
    });
};

exports.delete_a_form = function(req, res) {
    Form.remove({_id: req.params.formId}, function(err, form) {
        if (err)
            res.send(err);
        res.json(form);
    });
};