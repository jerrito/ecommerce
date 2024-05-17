import {Request,Response, NextFunction } from "express";
import { cartSchemaValidator, updateCartSchemaValidator } from "../schema/cart";
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
 

    //: TODO check if product is already added to cart and increase its quantity
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

  const cart=await prismaClient.cart.findMany({
    where:{
     userId:req.user?.id
    },
    include:{
      product:true
    }
  });

  res.status(200).json(cart);
    
};


export const deleteItemToCart=async(req:Request,res:Response,next:NextFunction)=>{
     
  await prismaClient.cart.delete({
    where:{
        id:+req.params.id,
        userId:req.user?.id
    }
  });

  res.status(200).json({"success":true});
};


export const changeQuantity=async(req:Request,res:Response,next:NextFunction)=>{
  const {quantity}=req.body;
  const validator=updateCartSchemaValidator.parse(quantity);
  const updateCartItemQuantity=await prismaClient.cart.update({

    where:{
      id:+req.params.id,
      userId:req.user?.id
    },
    data:{
      quantity:validator.quantity
    }
  });

  res.status(200).json(updateCartItemQuantity);
    
    
};