const zod=require('zod')
const jwt=require("jsonwebtoken")
const asynchandler=require("express-async-handler")
const argon2=require("argon2")
const user=require("../models/loginschema")
const loginschema=zod.object({
    email:zod.string().email(),
    password:zod.string()
})



const userlogin=asynchandler( async(req,res)=>{
    const loginDetails=req.body
    const result=loginschema.safeParse(loginDetails)
    if(!result.success)
        return res.send("enter a correct email and password")

    const userData=await user.findOne({email:loginDetails.email})
    if(!userData){
        return res.send("enter a valid email")
    }
    const dcyptPass=await argon2.verify(userData.password,loginDetails.password)
    if(!dcyptPass)
        return res.send("wrong password")
    const jwt_token=jwt.sign({id:userData.id},process.env.JWT_SECRET,{expiresIn:'1d'})
    res.json({"jwt_token":jwt_token})
})


module.exports=userlogin