 const JWT=require("jsonwebtoken")
 function authenticator(req,res,next){
    //For all protected routes this will work as authenticator.
    //If json verify it then we will send it to other routes
    let payload=req.headers;
    let token=payload.authorization.split(" ")[1]
    console.log(payload,token)
    try {
        let decoded= JWT.verify(token,"secret")
        if(decoded){
           let useriD=decoded.UserId
           req.body.userid=useriD
            console.log(decoded)
            next()
        }
    // In case of your note just pass the userid AND IT WILL GIVE ALL NOTES ASSOCIATED WITH IT.
        // res.send("here is your data")    
    } catch (error) {
        console.log(error)
        res.send({"message":"Not Authenticated, Please try again later"})
    }
    }
    module.exports={authenticator}