import { User } from '@prisma/client';
import { Express, Request as ExpressRequest } from 'express-serve-static-core';
import {Request } from "express";

declare global {
 declare namespace Express {
export   interface Request  extends Express.Request {
    user?: User;
  }
}
}

//export type AsyncRequestHandler=(req:express.Request)=> Promise<any>|Promise<void>|void;