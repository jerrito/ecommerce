import {Request,Response, NextFunction } from "express";
import { prismaClient } from ".."
import { addressValidator } from "../schema/address";
import { User } from '@prisma/client';
import { NotFoundException } from "../exceptions/not_found";
import { ErrorCode } from "../exceptions/root";


export const addAddress=async(req:Request,res:Response,next:NextFunction)=>{
  const {formattedaddress,lat,lng,country,city} =req.body;
  
  addressValidator.parse(req.body);
  

 
 
    

  const address= await prismaClient.address.create({
        data:{
            ...req.body,
            userId:req?.user?.id 
        }
    });

  return  res.status(200).json(address);

}


export const listAddress=async(req:Request,res:Response,next:NextFunction)=>{

  const address=await prismaClient.address.findMany({
    where:{
      id:req?.user?.id
    }
  });

  return res.status(200).json(address);

}

export const deleteAddress=async(req:Request,res:Response,next:NextFunction)=>{

  try{
  const address=await prismaClient.address.delete({
    where:{
      id:+req.params.id
    }
  });

   return res.status(200).json({success:true});
  }catch(e){
    throw new NotFoundException(
      "Address not found",
      ErrorCode.ProductNotFound
    )
  }
}