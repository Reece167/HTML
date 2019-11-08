const express = require('express');
const mongoose = require('mongoose');
const ToDo = mongoose.model('ToDo');

let router = express.Router();

router.get('/', (req, res) => {
    res.render("todo/addOrEdit", {
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    let task = new ToDo();
    task.task = req.body.task;
    task.save((err, doc) => {
        if (!err)
            res.redirect('todo/list');
        else {
            if (err.name == 'ValidationError') {
                res.render("todo/addOrEdit", {
                    task: req.body
                });
            }
            else {
                console.log(`Error during record insertion : ${err}`);
            }
        }
    });
}

function updateRecord(req, res) {
    ToDo.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('todo/list'); }
        else {
            if (err.name == 'ValidationError') {
                res.render("todo/addOrEdit", {
                    task: req.body
                });
            }
            else {
                console.log(`Error during record update : ${err}`);
            }
        }
    });
}

router.get('/list', (req, res) => {
    ToDo.find((err, docs) => {
        if (!err) {
            res.render("todo/list", {
                list: docs
            });
        }
        else {
            console.log(`Error in retrieving todo list : ${err}`);
        }
    });
});

router.get('/:id', (req, res) => {
    ToDo.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("todo/addOrEdit", {
                task: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    ToDo.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/todo/list');
        }
        else { console.log(`Error in todo delete : ${err}`); }
    });
});

module.exports = router;