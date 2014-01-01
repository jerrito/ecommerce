import { NextFunction, Request, Response } from "express";
import { ErrorCode, HTTPException } from "../exceptions/root";

export const errorMiddleware=(error:HTTPException, 
    req:Request,res:Response,
     nextFunction:NextFunction)=>

        res.status(error.statusCode)
        .json({
            message:error.message,
            error:error.errors,
            errorCode:error.errorCode
        });

