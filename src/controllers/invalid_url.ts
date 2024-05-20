import { Request, Response } from "express";
import { BadRequest } from "../exceptions/bad_request";
import { ErrorCode } from "../exceptions/root";




export const invalidUrl=(req:Request,res:Response)=>{

   res.status(404).json("Page not found")
}