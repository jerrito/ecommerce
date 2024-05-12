import { Request, Response, NextFunction } from "express";
import { UnAuthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { tokenKey } from "../secrets";
import { PrismaClient, User } from '@prisma/client';
import { prismaClient } from "..";

 const authMiddleware =async (req:Request,res:Response,next:NextFunction)=>{


    // 1. retrieve token from header 
    const token=req.headers.authorization; 
    
    

    // 2.If present verify token is valid and extract payload
    if(!token){
        next(new UnAuthorizedException(
            "Unauthorized",
            ErrorCode.Unauthorized,
        ),)
    }
   try{
 // 3. get the user fro payload

 const payload=jwt.verify(
    token!,
    tokenKey
) as any

// 4. Attach user to current request object

 const user=await prismaClient.user.findFirst({
    where:{id:payload.id}
 })

 if(!user){
    return next(new UnAuthorizedException(
        "Unauthorized",
        ErrorCode.Unauthorized,
    ),);
    }

   req.user  = user; 
   next();
 
   }catch(e){
    next(new UnAuthorizedException(
        "Unauthorized",
        ErrorCode.Unauthorized,
    ),);
   }
}

export default authMiddleware;