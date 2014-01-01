import { NextFunction, Response } from "express"
import { prismaClient } from ".."
import { productSchemaValidator } from "../schema/product"


export const addProduct=async(req:Request,res:Response,next:NextFunction)=>{

    productSchemaValidator.parse(req.body);

    const product=prismaClient.user.create({
        data:{
            ...req.body,
           // tags:req.body.tags.join(",")
        }
    });

    res.json(product);
}

export const getProducts=async(req:Request,res:Response,next:NextFunction)=>{

   
 }

 export const getProductById=async(req:Request,res:Response,next:NextFunction)=>{

    // const product=prismaClient.
 }

 export const updateProductById=async(req:Request,res:Response,next:NextFunction)=>{

    
 }

 export const deleteProductById=async(req:Request,res:Response,next:NextFunction)=>{

    // const product=prismaClient.
 }







