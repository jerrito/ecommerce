import { NextFunction, Request, Response } from "express"
import { ErrorCode, HTTPExceptions } from "./exceptions/root";
import { InternalException } from "./exceptions/internal_exception";

export const errorHandler=(method:Function)=>{

    return (req:Request,res:Response,next:NextFunction)=>{
       try{
        method(req,res,next);
       }catch(error:any){

        let exception:HTTPExceptions;
        if(error instanceof HTTPExceptions){
            exception=error;
        }else{
            exception=new InternalException(
                "Something went wrong!",
                error,
                ErrorCode.InternalServerError
            );
        }
        next(exception);
       } 
    }
}