const jwt=require("jsonwebtoken")
const asynchandler=require("express-async-handler")
const user=require("../models/loginschema")

const protect= async(req,res,next)=>{
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token=req.headers.authorization.split(' ')[1]
            const decodeToken=jwt.verify(token,process.env.JWT_SECRET)
            const userdata= await user.findById(decodeToken.id).select('-password')
            req.details=userdata
            next()
        }
        catch(err){
            res.staus(403).send(err)
        }
    }
}

module.exports=protect