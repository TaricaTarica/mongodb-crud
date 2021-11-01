const mongoose = require('mongoose');

const UserSchema =  mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    roles: [{
        name : String
    }]
  });

  module.exports = mongoose.model('User', UserSchema);