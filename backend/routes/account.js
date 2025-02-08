const express=require("express")
const accrouter=express.Router()
const protect=require("../middleware/protect")
const displayBalance=require("../controllers/displayBalance")
const transfer=require("../controllers/transfer")

accrouter.get("/balance",protect,displayBalance)
accrouter.post("/transfer",transfer)
module.exports=accrouter