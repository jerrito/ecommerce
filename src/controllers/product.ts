import { NextFunction, Response,Request } from "express"
import { prismaClient } from ".."
import { productSchemaValidator } from "../schema/product"
import { NotFoundException } from "../exceptions/not_found";
import { ErrorCode } from "../exceptions/root";


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

    try{
        const product=req.body;

        if(product.tags){
            product.tag=product.tags.join(",");
        }

        const updatedProduct=prismaClient.products.update({
            where:{
                id: +req.params.id
            },
            data:product
        });
        res.json(updatedProduct);
    }catch(e){
       
        throw new NotFoundException(
            "Product not found",
            ErrorCode.Unauthorized
        );
    }
 }

 export const deleteProductById=async(req:Request,res:Response,next:NextFunction)=>{

    try{
        
    }catch(e){
        throw new NotFoundException(
            "Product not found",
            ErrorCode.Unauthorized
        )
    }
 }






