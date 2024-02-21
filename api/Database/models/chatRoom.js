const mongoose = require('mongoose');
const Message = require('./message');

const chatRoomSchema = new mongoose.Schema({
    conversationID: {type: String, required: true, unique: true},
    conversationName: {type: String, required: true},
    messageList: {type: [Message.schema], required: true, default:[]},                                     // List of message IDs n->n relationship
    userIDs: {type: [String], required: true},            // List of user IDs n->n relationship
});

const chatRoom = mongoose.models.chatRoomSchema || mongoose.model('chatRoom', chatRoomSchema);
module.exports = chatRoom;