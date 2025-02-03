const express=require("express")
const userrouter=require("./user")
const accrouter=require("./account")
const router= express.Router()

router.use('/user',userrouter)
router.use('/account', accrouter)
router.get('/',(req,res)=>{
    res.status(200).send("hello")
})

module.exports=router