const jwt=require("jsonwebtoken")
const user=require("../models/loginschema")

const usersearch=async(req,res)=>{
    const filter = req.query.filter || {}
    const users= await user.find({
        $or: [{
            firstname:{
                $regex: filter
            }
        },
        {
            lastname:{
                $regex:filter
            }
    }]
    })

    res.json(user=>({
        firstname:user.firstname,
        lastname:user.lastname,
        email:user.email,
        _id:user._id
    }))

}

module.exports=usersearch