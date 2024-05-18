import {Request, Response, NextFunction } from "express";
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, Products, Address } from '@prisma/client';
import { BadRequest } from "../exceptions/bad_request";
import { ErrorCode } from "../exceptions/root";
import { addAddress } from './user';

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prismaClient = new PrismaClient({ adapter })



// get all orders
export const getOrders=(req:Request,res:Response, next:NextFunction)=>{


}


//get order by id
export const getOrderById=(req:Request,res:Response, next:NextFunction)=>{

    
}


// create order
export const createOrders=async(req:Request,res:Response, next:NextFunction)=>{


    // 1. Create a transaction
   
    // 2. List all cart items and proceed if cart s not empty
   
    // 3. Calculate the total amount 
    

    // 4. Fetch address of users

    // 5. Define computed field for formatted address on address module



    // 6.Create an order and and order products

    // 7. Create an event


    return await prismaClient.$transaction(async(tx)=>{

        const cartData=await tx.cart.findMany({
            where:{
                userId:req.user?.id
            },
            include:{
                product:true
            }
        });
        if(cartData.length == 0){

            return res.status(404).json({msg:"Cart is empty"});
        }

        const price= cartData.reduce((prev, current)=>{
            return prev + (current.quantity * +current.product.price)
        },0);


        const shippingAddress=await tx.address.findFirst({
            where:{
                id: req.user!.defaultShippingAddressId!
            }
        });

        const order=await tx.order.create({
            data:{
               userId:req.user!.id,
               netAmount:price,
               address:"address.formattedAddress",
               product:{
                create:  cartData.map((cart)=>{
                    return {
                        productId:cart.productId,
                        quantity:cart.quantity
                    };
                }),
               }
            },         
        });

        const orderEvent=await prismaClient.orderEvent.create({
            data:{
                orderId:req.user!.id
            }
        })

        await tx.cart.deleteMany({
            where:{
                userId:req.user?.id
            }
        });
   
        res.status(200).json(order);
    });

   
    
}

// cancel order
export const cancelOrderById=(req:Request, res:Response)=>{

    
}