import jwt, { JwtPayload } from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"


const secretkey = process.env.JWT_SECRET|| "abhishek"


const authvalidation =async(req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization
    
   try {
     const validtoken = token?.split(" ")[1];
    //  console.log(validtoken)
     if (!validtoken) {
       return res.status(404).json({msg: "token not provided"})
     }

     const decoded = await jwt.verify(validtoken, secretkey) 
     if(!decoded){
        return res.status(404).json({msg: "invalid token"})
     }
    //  console.log(decoded)


     //@ts-ignore
     req.user = decoded
     next()

     
    
   } catch (error) {
    console.log(error)
    return res
      .status(401)
      .json({ msg: "Error while token validation", error });
    
   }

}


export default authvalidation