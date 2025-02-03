const express=require("express")
const accrouter=express.Router()
const protect=require("../middleware/protect")
const displayBalance=require("../controllers/displayBalance")


accrouter.get("/balance",protect,displayBalance)

module.exports=accrouter