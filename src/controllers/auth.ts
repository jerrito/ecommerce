import {Response, Request, NextFunction} from "express";
//import { prismaClient as prisma } from "..";
import { hashSync, compareSync } from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { tokenKey } from "../secrets";
import { BadRequest } from "../exceptions/bad_request";
import { ErrorCode } from "../exceptions/root";
import { SignupSchema } from "../schema/user";
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })
export const signup=async(req:Request,res: Response,next: NextFunction)=>{
     
    SignupSchema.parse(req.body);  
    const {userName,email,password}=req.body;
    console.log(req.body);
     
    let user=await prisma.user.findFirst(
        {where:{email:email},},);
     if(user){
     new BadRequest("User already exist",ErrorCode.UserAlreadyExist
    )
     //res.status(404).send("User already exist",);
     }
    user=await prisma.user.create({
        data:{
            userName,
            email:email,
            password:hashSync(password,10),
            
        }
    })  
    res.status(200).json(user); 

    }
    

export const login=async(req:Request,res: Response,next:NextFunction)=>{

    const {email,password,tokenData}=req.body;

    const user=await prisma.user.findFirst({
        where:{email}});
        if(!user){

          return  new BadRequest(
              "User not found",
              ErrorCode.UserNotFound  
            );
       // return res.status(404).send("User not found");
        }

        const checkPassword=compareSync(password,user.password,);
        if(!checkPassword){
         return  new BadRequest(
                "Password incorrect",
                ErrorCode.WrongPassword
            );
        //return res.status(400).send("Password incorrect",);
        }
    const token=jwt.sign({
       id: tokenData,
    },tokenKey);
    //jwt.verify();
    res.status(200).json({...user,token})
}


export const me=async(req:Request,res: Response,next:NextFunction)=>{
       
       
    return res.json(req.user);
        
        
}