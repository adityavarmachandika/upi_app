const mongoose = require("mongoose")

require('dotenv').config();
const uri=process.env.MONGO_URI
let connection
const dbconnect =async ()=>{
    try{
        connection=await mongoose.connect(uri)
        console.log("database connected")
    }
    catch(err){
        console.log(err)
    }
}
module.exports={dbconnect,connection}