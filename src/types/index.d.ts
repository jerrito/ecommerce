
import { Express, Request  } from 'express-serve-static-core';

import { User } from '@prisma/client';

declare global {
 declare namespace Express {
export   interface Request {
  
   user :User;
  
  }
}
}

//export type AsyncRequestHandler=(req:express.Request)=> Promise<any>|Promise<void>|void;