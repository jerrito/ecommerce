import express from 'express';
import { adminMiddleware } from '../middlewares/admin';
import authMiddleware from '../middlewares/auth';
import { errorHandler } from '../error_handler';
import { addAddress, deleteAddress, listAddress, updateUser } from '../controllers/user';

const userRoute=express.Router();

userRoute.post("/address",[authMiddleware],errorHandler(addAddress));
userRoute.get("/address",[authMiddleware],errorHandler(listAddress));
userRoute.delete("/address/:id",[authMiddleware],errorHandler(deleteAddress));
userRoute.put("/user/update",[authMiddleware],errorHandler(updateUser));


export default userRoute;