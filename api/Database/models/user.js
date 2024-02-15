const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true},

    chatRoomList: {type: [String], required: true, default: []},            // List of chat room IDs n->n relationship

});

const User = mongoose.models.userSchema || mongoose.model('User', userSchema);
module.exports = User;