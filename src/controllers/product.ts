import { NextFunction, Response,Request } from "express"
import { prismaClient } from ".."
import { productSchemaValidator } from "../schema/product"
import { NotFoundException } from "../exceptions/not_found";
import { ErrorCode } from "../exceptions/root";
import { BadRequest } from "../exceptions/bad_request";


export const addProduct=async(req:Request,res:Response,next:NextFunction)=>{

    productSchemaValidator.parse(req.body);

    const product=prismaClient.products.create({
        data:{
            ...req.body,
           tags:req.body.tags.join(",")
        }
    });

    res.json(product);
}

export const getProducts=async(req:Request,res:Response,next:NextFunction)=>{
   
    const count=await prismaClient.products.count();

    const products=await prismaClient.products.findMany({
        skip: +req.query | 0,
        take:5
    });


    res.json({count,data:products});
   
 }

 export const getProductById=async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const product=prismaClient.products.findFirstOrThrow({
        where:{
            id:+req.params.id,
        }
    });

    res.status(200).json(product);
    }catch(e){

        new BadRequest("Product not found",
        ErrorCode.ProductNotFound)
    }
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
       
        new BadRequest(
            "Product not found",
            ErrorCode.ProductNotFound
        );
    }
 }

 export const deleteProductById=async(req:Request,res:Response,next:NextFunction)=>{

    try{
        
        
        const deleteProduct=prismaClient.products.delete({
         where:{
               id: +req.params.id
            }
        });

         res.json(deleteProduct);

    }catch(e){
         new NotFoundException(
            "Product not found",
            ErrorCode.ProductNotFound
        );
    }
 }







