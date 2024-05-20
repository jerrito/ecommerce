
export class HTTPException extends Error{
    message:string;
    errorCode:ErrorCode;
    statusCode:number;
    errors:ErrorCode;

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
            this.errors=error
        };
}


export const enum ErrorCode {
    UserNotFound = 2000,
    UserAlreadyExist = 2001,
    WrongPassword = 2003,
    ValidationError = 2004,
    InternalServerError = 500,
    Unauthorized = 401,
    AddressNotFound = 405,
    ProductNotFound = 403,
    OrderNotFound = 409,
    UnknownRoute = 404,
}