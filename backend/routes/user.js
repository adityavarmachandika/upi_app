const express= require("express")
const z=require("zod")
const userrouter=express.Router()
const usersignup=require("../controllers/usersignup")


userrouter.post('/signup',usersignup)
module.exports=userrouter
