import {Request,Response, NextFunction } from "express";
import { prismaClient } from ".."
import { addressValidator } from "../schema/address";
import { User } from '@prisma/client';
import { NotFoundException } from "../exceptions/not_found";
import { ErrorCode } from "../exceptions/root";


export const addAddress=async(req:Request,res:Response,next:NextFunction)=>{
  const {formattedaddress,lat,lng,country,city} =req.body;
  
  addressValidator.parse(req.body);
  let user:User;

  try{
  user= await prismaClient.user.findFirstOrThrow({
    where:{
        id:req.body.id
    }
 })

  }catch(e){
    new NotFoundException("User not found",
    ErrorCode.UserNotFound)
  }
    

  const address= await prismaClient.address.create({
        data:{
            ...req.body,
            userId:user.id
        }
    });

  return  res.status(200).json(address);

}


export const listAddress=async(req:Request,res:Response,next:NextFunction)=>{
}

export const deleteAddress=async(req:Request,res:Response,next:NextFunction)=>{

}