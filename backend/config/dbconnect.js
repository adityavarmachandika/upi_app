const mongoose = require("mongoose")

require('dotenv').config();
const uri=process.env.uri

const dbconnect =async ()=>{
    try{
        connection=await mongoose.connect(uri)
        console.log("database connected")
    }
    catch(err){
        console.log(err)
    }
}
module.exports=dbconnect