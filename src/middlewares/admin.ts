import {Request, Response, NextFunction } from "express";

export const adminMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    // const user=req.user;
    // if(user.role!="ADMIN"){
        // next(new UnAuthorizedException(
        //     "Unauthorized",
        //     ErrorCode.Unauthorized,
        // ),);
    //}
    next();
}