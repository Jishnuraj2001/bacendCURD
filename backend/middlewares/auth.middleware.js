const jwt=require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        const decoded=jwt.verify(token,process.env.Key);
        if(decoded){
            const userID=decoded.userID;
            req.body.userID=userID;
            next();
        }else{
            res.send("Please login first!");
        }
    }else{
        res.send("Please login first!");
    }
}


module.exports={
    auth
}