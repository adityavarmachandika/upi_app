const jwt=require("jsonwebtoken")
const {user}=require("../models/schema")

const usersearch=async(req,res)=>{
    const filter = typeof req.query.filter === "string" ? req.query.filter : "";
    try{
        const users= await user.find({
            $or: [{
                firstname:{
                    $regex: filter,
                    $options: "i"
                }
            },
            {
                lastname:{
                    $regex:filter,
                    $options: "i"
                }
        }]
        })
    
        res.json(users.map(user=>({
            firstname:user.firstname,
            lastname:user.lastname,
            email:user.email,
            _id:user._id
        })))
    }
    catch(err){
        console.log(err)
    }
    

}

module.exports=usersearch