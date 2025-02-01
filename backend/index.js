const express=require("express")
const router=require("./routes/index")
const errorhandler=require("./middleware/errorhandler")
const cors=require("cors")
const port=6969

const app=express()
 app.use(cors())
 app.use(express.json())
app.use('/api/v1',router)

app.use(errorhandler)


app.get('/',(req,res)=>{
    res.send("hello namaste");
})

app.listen(port,(err)=>{
    console.log('port is running in http://localhost:6969')
    console.log(err)
})