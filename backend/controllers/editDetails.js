const {user}=require("../models/schema")
const asynchandler=require("express-async-handler")
const z=require("zod")

const editschema=z.object({
    firstname:z.string(),
    lastname:z.string(),
    email:z.string().email()
})
const editDetails=asynchandler(async (req,res)=>{
    const details=req.details
    const dataToEdit=req.body
    const {success}=editschema.safeParse(dataToEdit)
    if(!success)
        return res.status(411).send("enter valid name and email")

    const updateuser=await user.updateOne({
         _id:details.id
     },{$set:dataToEdit})
     
    res.send(updateuser)

})

module.exports=editDetails