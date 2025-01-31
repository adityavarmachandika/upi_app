const express=require("express")
const userrouter=require("./user")
const router= express.Router()
router.get('/user',userrouter)
router.get('/',(req,res)=>{
    res.status(200).send("hello")
})

module.exports=router