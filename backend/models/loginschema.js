const mongoose = require("mongoose")
const dbconnect=require("../config/dbconnect")

dbconnect()

const userschema= mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"please enter a valid firstname"]

    },
    lastname:{
        type:String,
        required:[true,"please enter a valid lastname"]
    },
    email:{
        type:String,
        required:[true,"please enter a valid email"],
        unique:[true,"already taken"]
    },
    password:{
        type:String,
        required:[true,"please enter a valid password"]
    }
})

module.exports=mongoose.model("user",userschema)