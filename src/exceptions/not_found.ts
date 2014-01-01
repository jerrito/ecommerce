import { HTTPException } from "./root";


export class NotFoundException extends HTTPException{
  constructor(message:string,errorCode:number){
    super(message,errorCode,404,null)
  }
}