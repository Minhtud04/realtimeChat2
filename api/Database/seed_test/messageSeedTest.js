const dbConnect = require("../dbConnection")
const mongoose = require('mongoose')
const Message = require("../models/message")


const seedData = {
    data1: {
        messageID: "1",
        conversationID: "1",
        userID: "user1",
        timeSent: "2021-07-10T18:00:00.000Z",
        content: "Hello"
    },
    data2: {
        messageID: "2",
        conversationID: "1",
        userID: "user2",
        timeSent: "2021-07-10T18:01:00.000Z",
        content: "Hi"
    },

    data2: {
        messageID: "3",
        conversationID: "2",
        userID: "user1",
        timeSent: "2021-07-10T18:02:00.000Z",
        content: "Hows it going"
    },
}

async function seedMessage(){
    try {
        await dbConnect();

        //seed pre-save
        const existedData = await Message.find({});    //Query optimization...?
        if (existedData.length !== 0){
            await Message.collection.drop();
            console.log("Delete all previous Data before seeding");
        }

        //database logic
        for (let key in seedData){
            const newMessage = new Message(seedData[key]);
            await newMessage.save();
        }

        //Disconnect -> Terminal stop
        mongoose.disconnect();

    } catch(err){
        console.log("Could not seed")
        console.log(err)
    }

}

seedMessage()