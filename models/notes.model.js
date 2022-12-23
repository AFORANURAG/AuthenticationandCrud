const mongoose=require("mongoose")

let notesSchema=mongoose.Schema({
note:String,
name:String,
title:String,
userid:String,

},{
    versionKey:false
})


let NoteModel=mongoose.model("note",notesSchema)
module.exports={NoteModel,notesSchema}