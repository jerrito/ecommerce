import express from 'express';
import { adminMiddleware } from '../middlewares/admin';
import authMiddleware from '../middlewares/auth';
import { errorHandler } from '../error_handler';
import { addAddress, deleteAddress, listAddress, listUsersOrders, updateUser } from '../controllers/user';

const userRoute=express.Router();
 
//add address
userRoute.post("/address",[authMiddleware],errorHandler(addAddress));

// list address
userRoute.get("/address",[authMiddleware],errorHandler(listAddress));

// delete address
userRoute.delete("/address/:id",[authMiddleware],errorHandler(deleteAddress));

// update user
userRoute.put("/user/update",[authMiddleware],errorHandler(updateUser));


// list user orders
userRoute.get("/user/order",[authMiddleware],errorHandler(listUsersOrders));





export default userRoute;