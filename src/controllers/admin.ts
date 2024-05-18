import {Request,Response, NextFunction } from "express"
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, Products, Address } from '@prisma/client';
import { BadRequest } from "../exceptions/bad_request";
import { ErrorCode } from "../exceptions/root";
import { addAddress } from './user';
import { NotFoundException } from "../exceptions/not_found";
import { roleSchema } from '../schema/user';

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prismaClient = new PrismaClient({ adapter })

export const listAllUsers=async (req:Request,res:Response,next:NextFunction)=>{

    const allUsers=await prismaClient.user.findMany({
        where:{
        role:"USER"
        }
    });

    res.status(200).json(allUsers);
}

export const getUserById=async (req:Request,res:Response,next:NextFunction)=>{
try{
    const userGetById=await prismaClient.user.findFirstOrThrow({
    where:{
        id:+req.params.id
    },include:{
        address:true
    }
});
   res.status(200).json(userGetById);
}catch(e){
    new NotFoundException("User not found",
    ErrorCode.UserNotFound);
}

}



export const changeUserRole=async (req:Request,res:Response,next:NextFunction)=>{
  const  validateRole= roleSchema.parse(req.body.role);
    try{
        const userRole=await prismaClient.user.update({
        where:{
            id:+req.params.id
        },data:{
            role:validateRole.role
        }
    });
       res.status(200).json(userRole);
    }catch(e){
        new NotFoundException("User not found",
        ErrorCode.UserNotFound);
    }
    
    }