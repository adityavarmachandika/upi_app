const { transaction } = require("../models/schema")
const { default: mongoose } = require("mongoose")
const asynchandler = require("express-async-handler")


const transactionHistory= asynchandler(async (req,res)=>{
        const userid=req.query.userid

        const transactionData= await transaction.find({
            $or:[
                {senderUserId:userid},
                {receiverUserId:userid}
            ]
        })
        res.json(transactionData)
    }
)

module.exports=transactionHistory