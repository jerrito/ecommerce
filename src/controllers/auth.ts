import {Response, Request} from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { tokenKey } from "../secrets";

export const signup=async(req:Request,res: Response)=>{
    try{    
     const {userName,email,password}=req.body;
     console.log(req.body);
     
    let user=await prismaClient.user.findFirst(
        {where:{email:email},},);
     if(user)
     return res.status(404).send("User already exist",);
    user=await prismaClient.user.create({
        data:{
            userName,
            email:email,
            password:hashSync(password,10),
            
        }
    })  
    res.status(200).json(user); 

    }catch(e:any){
    res.status(500).json({"msg":e.message},)
    }
    }

export const login=async(req:Request,res: Response)=>{

    try{
    const {email,password,tokenData}=req.body;

    const user=await prismaClient.user.findFirst({
        where:{email}});
        if(!user)
        return res.status(404).send("User not found");

        const checkPassword=compareSync(password,user.password,);
        if(!checkPassword)
        return res.status(400).send("Password incorrect",);
    const token=jwt.sign({
       id: tokenData,
    },tokenKey);
    //jwt.verify();
    res.status(200).json({token,...user})

    }catch(e:any){
        res.status(500).json({"err":e.message});
    }
}


export const me=async(req:Request,res: Response)=>{
        try{
        
        }catch(e){
            res.status(500).json({"err":""});
        }
            }