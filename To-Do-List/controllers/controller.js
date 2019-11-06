const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const  = mongoose.model('');

router.get('/', (req, res) => {
    res.render("addOrEdit", {
    });
});

router.post('/', (req, res) => {
    insertRecord(req, res)
});

function insertRecord(req, res) {
    let  = new ();
    .task = req.body.item;
    .save((err, doc) => {
        if (err) {
            console.log(`Error during record insertion : ${err}`)
        } else {
            console.log('worked!')
        }
    });
}

router.get('/done', (req, res) => {
    res.json('done')
});

module.exports = router;