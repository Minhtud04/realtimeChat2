const express = require('express');
const userRoute = express.Router();

const userController = require('../Controller/userController');

const User = new userController();

//Post: signup user 
routeUser.post('/signup', User.validateRequest, User.postSignup);

//Post: login user
routeUser.post('/login', User.validateRequest, User.postLogin);
//Get: get user chatrooms
routeUser.get('/chatrooms', User.getUserChatRooms);     //this is the endpoint for chatrooms
//Get: get user info
routeUser.get('/info', User.getUserInfo);
//Post: create chatroom with other user

