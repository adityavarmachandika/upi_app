const express= require("express")
const z=require("zod")
const userrouter=express.Router()
const usersignup=require("../controllers/usersignup")
const userlogin=require("../controllers/userlogin")
const protect=require("../middleware/protect")
const editDetails=require("../controllers/editDetails")
const search=require("../controllers/search")

userrouter.post('/signup',usersignup)
userrouter.post('/login',userlogin)
userrouter.put("/editDetails",protect,editDetails)
userrouter.get("/search",protect,search)
userrouter.get('/getdata',protect,(req,res)=>{
    res.send(req.details)
})
module.exports=userrouter
