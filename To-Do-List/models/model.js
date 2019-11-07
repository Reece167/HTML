const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    task: {
        type: String,
        required: 'This field is required.'
    },
});

mongoose.model('ToDo', Schema);