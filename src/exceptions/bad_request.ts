import { ErrorCode, HTTPExceptions } from "./root";

export class BadRequest extends HTTPExceptions{
    
    constructor(
        message:string,
        errorCode:ErrorCode
    ){
        super(message,errorCode,400,null)
        
    }
}