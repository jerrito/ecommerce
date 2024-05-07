import { HTTPExceptions } from "./root";

export class ValidationError extends HTTPExceptions{
 constructor(error:any,message:string,errorCode:number){
     super(message,errorCode,422,error);
    
 }
}