import {Request,Response, NextFunction } from "express";
import { addressValidator } from "../schema/address";
import { Address, Prisma, User } from '@prisma/client';
import { NotFoundException } from "../exceptions/not_found";
import { ErrorCode } from "../exceptions/root";
import { BadRequest } from "../exceptions/bad_request";
import { UpdateSchema as UpdateUserSchema } from "../schema/user";
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prismaClient = new PrismaClient({ adapter })

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
      await prismaClient.address.delete({
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


export const updateUser=async(req:Request,res:Response)=>{
   const userUpdateValidator=UpdateUserSchema.parse(req.body);
   
   let shippingAddress:Address;
   let billingAddress:Address;
   
   if(userUpdateValidator.defaultShippingAddressId){
  
    try{
  
    shippingAddress=await prismaClient.address.findFirstOrThrow({
    where:{
      id: userUpdateValidator.defaultShippingAddressId,
    }
  },);
  if(shippingAddress.id != req?.user?.id){

    throw new BadRequest(
      "Address does not belong to user",
      ErrorCode.AddressNotFound
    )
  }
}catch(e){
   new BadRequest(
    "Address not found",
    ErrorCode.AddressNotFound
   )
}
   }


   if(userUpdateValidator.defaultBillingAddressId){
    try{
    
      billingAddress=await prismaClient.address.findFirstOrThrow({
      where:{
        id: userUpdateValidator.defaultBillingAddressId,
      }
    },);

    if(billingAddress.id != req?.user?.id){

      throw new BadRequest(
        "Address does not belong to user",
        ErrorCode.AddressNotFound
      )
    }
   
  }catch(e){
     new BadRequest(
      "Address not found",
      ErrorCode.AddressNotFound
     )
  }
     }

     const updateUser=await prismaClient.user.update({
      where:{
        id:req?.user?.id
      },
      data: userUpdateValidator as Prisma.JsonObject 
     })

  res.status(200).json(updateUser);
}