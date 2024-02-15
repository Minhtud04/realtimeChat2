const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderUsername: {type: String, required: true},
    timeSent: {type: Date, required: true, default: Date.now},
    message: {type: String, required: true},
});

const Message = mongoose.models.messageSchema || mongoose.model('Message', messageSchema);
module.exports = Message;
