const express= require("express")

const userrouter=express.Router();
userrouter.get('/',(req,res)=>{
    res.send("hello world")
})
module.exports=userrouter