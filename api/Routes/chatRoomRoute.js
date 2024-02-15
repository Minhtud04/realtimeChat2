const express = require('express');
const chatRoomRoute = express.Router();

const chatRoomController = require('../Controller/chatRoomController');

// Post: create chatroom
chatRoomRoute.post('/createRoom', chatRoomController.validateRequest, chatRoomController.postCreateChatRoom);

// Get: get chatroom messages
chatRoomRoute.get('/messages', chatRoomController.getChatRoomMessages);

