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
        required:[true],
        ref:'user'
    },
    balance:{
        type:Number,
        required:[true]
    }
})


const transactionSchema= mongoose.Schema({
    senderUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Sender user ID is required"],
        ref: 'user'
    },
    receiverUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Receiver user ID is required"],
        ref: 'user'
    },
    amount: {
        type: Number,
        required: [true, "Transaction amount is required"],
        min: [1, "Transaction amount should be at least 1"]
    }
})

const user=mongoose.model("user", userschema)
const account=mongoose.model("account",accountSchema)
const transaction= mongoose.model("transaction", transactionSchema)
module.exports={user,account,transaction}