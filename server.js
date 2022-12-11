require("dotenv").config()
const express=require("express");
const JWT=require("jsonwebtoken")

const {userRouter}=require("./routes/users.routes")
const {connection}=require("./config/db")
const {notesRouter}=require("./routes/notes.router")
const app=express()







app.use("/user",userRouter)
app.use("/notes",notesRouter)

app.get("/",(req,res)=>{
res.send("hello from my side")
})
app.listen(process.env.PORT,async(req,res)=>{
try {
await connection
console.log("connected successfully")

} catch (error) {
    console.log(`error in connecting to db ${error}`)

}
console.log(`listening on port ${process.env.PORT}`)
})

// lets start writing a authentication system from scratch
