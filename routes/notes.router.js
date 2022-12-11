const {authenticator}=require("../middleware")
const JWT=require("jsonwebtoken")
const express=require("express")
const bcrypt=require("bcrypt")
const notesRouter=express.Router()
const {NoteModel} =require("../models/notes.model")

notesRouter.use(express.json())

// so let me first complete the backend
notesRouter.use(authenticator)
notesRouter.get("/",(req,res)=>{
console.log(req.body)
res.send("Welcome to my backend application")
})

notesRouter.get("/createNote",async(req,res)=>{
// One is noteid and one is user id 
// put parent id in note id   
// here the user can create note
let {name,note,userid}=req.body;
// console.log(payload)
try {
 let query=new NoteModel({name,note,userid})  
await query.save()
res.send({"message":"note created successfully"})
} catch (error) {
    console.log(error)
    res.send({"message":"error while creating your error"})
}

})




//---------------------------------------------=---------------------------------------------------
notesRouter.get("/allnotes",async(req,res)=>{
    //IN CASE OF ALL NOTES ,NO USERID IS REQUIRED
 
    try {
let query=await NoteModel.find({})
res.send(query)
   } catch (error) {
    console.log(error)
res.send({"message":"servererror"})
}
})
//------------------------------------------------------------------------------------------------------------
notesRouter.get("/yournotes",async(req,res)=>{
    //IN CASE OF ALL NOTES ,NO USERID IS REQUIRED
   let {userid}=req.body
   console.log(userid)
    try {
let query=await NoteModel.find({userid:userid})
res.send(query)
   } catch (error) {
    console.log(error)
res.send({"message":"servererror"})
}
})
//-------------------------------------------------------------------------------------------
//delete note
notesRouter.delete("/deletenote/:noteid",async(req,res)=>{
// in this case we have to provide a unique criteria to find a note 
// note id can be use to update it , we can send it in params
//also to take of authorisation we also have to use authenticator here
// we want user id and we want notteid
// he can delete only his note.
// we will get the note id in the front end.
let noteId=req.params.noteid
let body=req.body.userid;
console.log(body)
try {   
let query=await NoteModel.findOneAndDelete({_id:noteId,userid:body})
if(query){
    res.send({"message" :"deleted successfully"})
}else{
    res.send({"message":"not authorized"})
}


} catch (error) {
console.log(error)
res.send({message:"error in deleting your note"})
}
})

//---------------------------------------------------------------------------------------------------
// patch request
notesRouter.patch("/updatenote/:noteid",async(req,res)=>{
    // in this case we have to provide a unique criteria to find a note 
    // note id can be use to update it , we can send it in params
    //also to take of authorisation we also have to use authenticator here
    // we want user id and we want notteid
    // he can delete only his note.
    // we will get the note id in the front end.
    let noteId=req.params.noteid;
    let userid=req.body.userid;
    let payload=req.body;
   
    try {   
      
    let query=await NoteModel.findOneAndUpdate({_id:noteId,userid:userid},payload)
    if(query){
        res.send({"message" :"updated successfully"})
    }else{
        res.send({"message":"not authorized"})
    }
    
    
    } catch (error) {
    console.log(error)
    res.send({message:"error in deleting your note"})
    }
    })
//----------------------------------------------------------------------------------------------
module.exports={notesRouter}