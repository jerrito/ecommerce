import { HTTPExceptions } from "./root";


export class NotFoundException extends HTTPExceptions{
  constructor(message:string,errorCode:number){
    super(message,errorCode,404,null)
  }
}