const dbConnect = require("../dbConnection")
const User = require("../models/user")
const mongoose = require('mongoose')


const seedData = {
    data1: {
        email: "minh3@gmail.com",
        username: "Minhtud04",
        password: "123haf34"
    },
    data2: {
        email: "",                      //no email
        username: "q24",
        password: "123hafdf"
    },

    data2: {
        email: "1a.com",
        username: "q24",                //unique key
        password: "124mcdf"
    },
}




async function seedUser(){
    try {
        await dbConnect();

        //seed pre-save
        const existedData = await User.find({});    //Query optimization...?
        if (existedData.length !== 0){
            await User.collection.drop();
            console.log("Delete all previous Data before seeding");
        }

        //database logic
        for (let key in seedData){
            const newUser = new User(seedData[key]);
            await newUser.save();
        }

        //Disconnect -> Terminal stop
        mongoose.disconnect();

    } catch(err){
        console.log("Could not seed")
        console.log(err)
    }

}

seedUser()