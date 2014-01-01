import { HTTPException } from "./root";

export class ValidationError extends HTTPException{
 constructor(message:string,error:any,errorCode:number){
     super(message,errorCode,422,error);
    
 }
}