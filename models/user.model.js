const mongoose=require("mongoose")

let userSchema=mongoose.Schema({

password:String,
email:String
},{
    versionKey:false
})


let UserModel=mongoose.model("user",userSchema)
module.exports={UserModel,userSchema}