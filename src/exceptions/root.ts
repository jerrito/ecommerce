
export class HTTPExceptions extends Error{
    message:string;
    errorCode:ErrorCode;
    statusCode:number;
    error:any;

    constructor(
        message:string,
        errorCode:ErrorCode,
        statusCode:number,
        error:any
        ){
            super(message)
            this.message=message
            this.statusCode=statusCode
            this.errorCode=errorCode
            this.error=error
        };
}

export const enum ErrorCode{
    UserNotFound=2000,
    UserAlreadyExist=2001,
    WrongPassword=2003,
    ValidationError=2004,
    InternalServerError=500,

}