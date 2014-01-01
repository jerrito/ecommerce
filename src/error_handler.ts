import { NextFunction, Request, Response } from "express"
import { ErrorCode, HTTPException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal_exception";
import { ZodError } from "zod";
import { BadRequest } from "./exceptions/bad_request";
import { ValidationError } from "./exceptions/validation";

export const errorHandler=(method:Function)=>{

    return async (req:Request,res:Response,next:NextFunction)=>{
       try{

      await  method(req,res,next);
       
    }catch(error:any){

        let exception:HTTPException;
        if(error instanceof HTTPException){
            exception=error;
        }else{
            if(error instanceof ZodError){
                next(new ValidationError("Validation error",
               "Invalid data", ErrorCode.ValidationError,),);
            }
            else{
                exception=new InternalException(
                    "Something went wrong!",
                    error,
                    ErrorCode.InternalServerError
                );
            next(exception);
        }
            
        }
       
       } 
    }
}