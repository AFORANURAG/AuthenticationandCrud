const JWT=require("jsonwebtoken")
const express=require("express")
const bcrypt=require("bcrypt")
const userRouter=express.Router()
const {UserModel} =require("../models/user.model")
userRouter.use(express.json())
userRouter.get("/",(req,res)=>{
    res.send("welcome to the home page")
})
// so let me first complete the backend
//
userRouter.get("/getuser",async(req,res)=>{
   try {
        let users=await UserModel.find({})
    res.send(users)
    } catch (error) {
        console.log(error)
        res.send("trouble in loading your data")
    }
})

userRouter.get("/admin",(req,res)=>{
// this route is protected, it need authentication and authorisation both.
// because even after signing in not every could see this because it is only for admins.
// for authenticatiton and authorisation , we want jwt verification 
let payload=req.headers;
let token=payload.authorization.split(" ")[1]
console.log(payload,token)
try {
    let decoded= JWT.verify(token,"secret")
    console.log(decoded)
    res.send("here is your data")    
} catch (error) {
    console.log(error)
}
})

//------------------------------------------------------------------------------------------------------------
userRouter.post("/login",async(req,res)=>{
// In the login section we are first going to catch the data.
let {password,email}=req.body
console.log(req.body)

let query=await UserModel.find({email})
// we dont need to hash it but we do need bcrypt for verification.
bcrypt.compare(password,query[0].password,(err,result)=>{
if(err) throw err
if(result&&query[0].email==email){

const token=JWT.sign({UserId:query[0]._id},"secret",{expiresIn:"2000h"})
//this token has user id as the message so when decoded successfully it will give user id back
res.send({"token":token,"message":"login successful"})
}else{
res.send({"message": "login failed please try again."})
}
// so make sure to console at every step    
})
})
//-------------------------------------------------------------------------------------------



userRouter.post("/signup",async(req,res)=>{
let {password,email}=req.body
// so let me optimize the signup 
let find=await UserModel.findOne({email})
// console.log(find[0].email)
if(find==undefined){
  // So Signup is now optimized  
    bcrypt.hash(password, 0, async function(err, hash) {
        if(err) throw err
    try {
    let inserted_data=new UserModel({email,password:hash})
    res.send("account created successfully")
    await inserted_data.save()
    }catch (error) {
        console.log(`error in signing up ${error}`)   
     res.send("error in creating your account try again later")
    }
       console.log("hello")
      
    })
}else{
    res.send("Account Already exists")
}


})
//---------------------------------------------------------------------------------------------------
module.exports={userRouter}