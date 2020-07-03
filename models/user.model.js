const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    gender: {
        type: String
    },
    mobileno: {
        type: String
    }
});

mongoose.model('User', userSchema);