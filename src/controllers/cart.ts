import {Request,Response, NextFunction } from "express";
import { cartSchemaValidator } from "../schema/cart";
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, Products } from '@prisma/client'
import { BadRequest } from "../exceptions/bad_request";
import { ErrorCode } from "../exceptions/root";

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prismaClient = new PrismaClient({ adapter })

export const addItemToCart=async(req:Request,res:Response,next:NextFunction)=>{
    const validate=cartSchemaValidator.parse(req.body);
 
    let product:Products;
  
    try{
  product=await prismaClient.products.findFirstOrThrow({

    where:{
        id:validate.productId
    }
  });

  const cart=await prismaClient.cart.create({
    data: {
      productId:product.id,
      userId:req!.user!.id,
      quantity:validate.quantity,
    },
},);

res.status(200).json(cart);
    }catch(e){
        new BadRequest(
            "Product not found",
            ErrorCode.ProductNotFound);
    }
 



};


export const getCart=async(req:Request,res:Response,next:NextFunction)=>{

    
};


export const deleteItemToCart=async(req:Request,res:Response,next:NextFunction)=>{

    
  await prismaClient.cart.delete({
    where:{
        id:req!.user!.id,
        productId:3

    }
  });

};


export const changeQuantity=async(req:Request,res:Response,next:NextFunction)=>{

    
    
};