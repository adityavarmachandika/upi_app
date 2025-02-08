const {account}=require("../models/schema")

const displayBalance= async (req,res)=>{

    const accountdetails=await account.findOne({userId:req.details.id})

    return res.json({"balance":accountdetails.balance})

}

module.exports=displayBalance