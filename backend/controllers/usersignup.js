
const argon2=require("argon2")
const user=require("../models/loginschema")
const z=require("zod")
const asynchandler= require("express-async-handler")
const jwt=require("jsonwebtoken")
const userschema=z.object({
    firstname:z.string(),
    lastname:z.string(),
    email:z.string().email(),
    password:z.string() 
})


const usersignup =asynchandler(
     async(req,res)=>{
        const userdata=req.body
        const result=userschema.safeParse(userdata);
        //checking the entered user data using zod
        // if(result.success)
        //     res.status(200).send(result.success)
        // else
        //     res.status(401).send(result.error)
    
        //checking wether the email is already taken or not
        const finduser= await user.findOne({ email: userdata.email})
    
        if(finduser){
            return res.json({
                error:"email already taken"
            })
        }
    
        //hash the password using argon2
        const hashedpass=await argon2.hash(userdata.password)
        //res.json({password:hashedpass})
        //enter the userdata into the mognodb
        const usertodb=new user({
            firstname:userdata.firstname,
            lastname:userdata.lastname,
            email:userdata.email,
            password:hashedpass
        })
        const saveduser=await usertodb.save()
        
        const jwt_token= jwt.sign({id:saveduser.id},process.env.JWT_SECRET,{expiresIn:'5d'})  
        res.json({"jwt_token":jwt_token,"data":"user is created"} )  
    }
)
module.exports=usersignup