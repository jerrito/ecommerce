import {  HTTPException } from "./root";

 export class UnAuthorizedException extends HTTPException{
   constructor(message:string,errorCode:number,errors?:any){
    super(message,errorCode,401,errors);
   }
}