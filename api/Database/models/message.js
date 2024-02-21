const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    messageID: {type: String, required: true, unique: true},
    conversationID: {type: String, required: true},
    userID: {type: String, required: true},
    timeSent: {type: Date, required: true, default: Date.now},
    content: {type: String, required: true},
});

const Message = mongoose.models.messageSchema || mongoose.model('Message', messageSchema);
module.exports = Message;
