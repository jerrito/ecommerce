import {Request, Response, NextFunction } from "express";
import { UnAuthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";

export const adminMiddleware=async(req:Request,res:Response,next:NextFunction)=>{
    const user=  req.user;
    if(user?.role != "ADMIN"){
       return next(new UnAuthorizedException(
            "Unauthorized",
            ErrorCode.Unauthorized,
        ),);
    }
    next();
}