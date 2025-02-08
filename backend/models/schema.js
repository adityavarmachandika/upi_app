const mongoose = require("mongoose")
const {dbconnect}=require("../config/dbconnect")

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

const accountSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true]
    },
    balance:{
        type:Number,
        required:[true]
    }
})

const user=mongoose.model("user", userschema)
const account=mongoose.model("account",accountSchema)
module.exports={user,account}