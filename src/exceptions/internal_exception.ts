import { ErrorCode, HTTPExceptions } from "./root";

export  class InternalException extends HTTPExceptions{
    constructor(message:string,error:any,errorCode:number){
        super(message,errorCode,500,error);
    }
}