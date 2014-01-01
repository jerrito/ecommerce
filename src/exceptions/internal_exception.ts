import { ErrorCode, HTTPException } from "./root";

export  class InternalException extends HTTPException{
    constructor(message:string,error:any,errorCode:number){
        super(message,errorCode,500,error);
    }
}