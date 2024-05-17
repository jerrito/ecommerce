import { Request, Response, NextFunction } from "express";
import { UnAuthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { tokenKey } from "../secrets";
import { PrismaClient, User } from '@prisma/client';
import { prismaClient } from "..";
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg';
const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })
 const authMiddleware =async (req:Request,res:Response,next:NextFunction)=>{


    // 1. retrieve token from header 
    const token=req.headers.authorization; 
    
    
    console.log("nn");
    console.log(typeof token);
    // 2.If present verify token is valid and extract payload
    if(token == undefined){
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
console.log(payload.userId);

 const user=await prisma.user.findFirst({
    where:{id:Number(payload.userId)}
 });
 console.log("ee");
 
 if(!user){
   return  next(new UnAuthorizedException(
        "User not found",
        ErrorCode.UserNotFound,
    ),);
    }

   req.user  = user; 
   next();
 
   }catch(e){
    next(new UnAuthorizedException(
        "Unauthorization",
        ErrorCode.Unauthorized,
    ),);
   }
}

export default authMiddleware;