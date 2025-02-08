const { account } = require("../models/schema")
const { default: mongoose } = require("mongoose")
const asynchandler = require("express-async-handler")


const transfer = asynchandler(async (req, res) => {
    const session = await mongoose.startSession()
    const { from, to, amount } = req.body
    try {
        await session.startTransaction()
        const sender = await account.findOne({ userId: from }).session(session)
        if (!sender) {
            return res.send("no user found")
        }
        else if (sender.balance < amount) {
            return res.send("insufficent amount")
        }
        const receiver = await account.findOne({ userId: to }).session(session)
        if (!receiver) {
            return res.send("no reciver found")
        }
        await account.updateOne({ userId: from }, { $inc: { balance: -amount } }).session(session)
        await account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session)
        await session.commitTransaction()
        res.send("transaction succesfull")
    }
    catch (err) {
        res.status(400).send(err)
        await session.abortTransaction()
    }
    finally {
        await session.endSession()
    }
})

module.exports = transfer
