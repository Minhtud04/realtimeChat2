const dbConnect = require("../dbConnection")
const mongoose = require('mongoose')
const Message = require("../models/message")
const chatRoom = require("../models/chatRoom")



const stringMes = {
    data1: {
        messageID: "1",
        conversationID: "1",
        userID: "1",
        timeSent: "2021-07-10T18:00:00.000Z",
        content: "Hello"
    },
    data2: {
        messageID: "2",
        conversationID: "1",
        userID: "2",
        timeSent: "2021-07-10T18:01:00.000Z",
        content: "Hi"
    },

    data3: {
        messageID: "3",
        conversationID: "2",
        userID: "1",
        timeSent: "2021-07-10T18:02:00.000Z",
        content: "Hows it going"
    },
}

const seedMes = {
    data1: new Message(stringMes.data1),
    data2: new Message(stringMes.data2),
    data3: new Message(stringMes.data3)
}

const seedRoom = {
    data1: {
        conversationID: "1",
        conversationName: "Room1",
        messageList: [ seedMes.data1, seedMes.data2],
        userIDs: ["user1", "user2"]
    },
    data2: {
        conversationID: "2",
        conversationName: "Room2",
        messageList: [seedMes.data3],
        userIDs: ["user1"]
    },
    data3: {
        conversationID: "3",
        conversationName: "Room3",
        messageList: [],
    },
}


async function seedMessage(){
    try {
        await dbConnect();

        //seed pre-savec
        const existedData = await chatRoom.find({});    //Query optimization...?
        if (existedData.length !== 0){
            await chatRoom.collection.drop();
            console.log("Delete all previous Data before seeding");
        }

        //database logic
        for (let key in seedRoom){
            const newRoom = new chatRoom(seedRoom[key]);
            await newRoom.save();
        }

        //Disconnect -> Terminal stop
        mongoose.disconnect();

    } catch(err){
        console.log("Could not seed")
        console.log(err)
    }

}

seedMessage()