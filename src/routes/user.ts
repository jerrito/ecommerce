import express from 'express';
import { adminMiddleware } from '../middlewares/admin';
import authMiddleware from '../middlewares/auth';
import { errorHandler } from '../error_handler';
import { addAddress, deleteAddress, listAddress } from '../controllers/user';

const userRoute=express.Router();

userRoute.post("/address",[authMiddleware,adminMiddleware],errorHandler(addAddress));
userRoute.get("/address",[authMiddleware,adminMiddleware],errorHandler(listAddress));
userRoute.delete("/address/:id",[authMiddleware,adminMiddleware],errorHandler(deleteAddress));