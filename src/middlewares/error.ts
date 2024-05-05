import { NextFunction, Request, Response } from "express";
import { ErrorCode, HTTPExceptions } from "../exceptions/root";

export const errorMiddleware=(error:HTTPExceptions, 
    req:Request,res:Response,
     nextFunction:NextFunction)=>

        res.status(error.statusCode)
        .json({
            message:error.message,
            error:error.error,
            errorCode:error.errorCode
        });

