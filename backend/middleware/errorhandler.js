
const errorhandler= async(err,req,res,next)=>{
    const statuscode=res.statuscode?res.statuscode:500
    res.status(statuscode)
    res.json({
        message:err.msg,
        stack:err.stack
    })
}

module.exports=errorhandler