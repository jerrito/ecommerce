import express, {Express, Request, Response, Router} from "express";
import { addItemToCart, changeQuantity, deleteItemToCart, getCart } from "../controllers/cart";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../error_handler";


const cartRoute:Router=express.Router();


cartRoute.post("/cart",[authMiddleware],errorHandler(addItemToCart))

cartRoute.get("/cart",[authMiddleware],errorHandler(getCart))

cartRoute.delete("/cart/:id",[authMiddleware],errorHandler(deleteItemToCart))

cartRoute.put("/cart/:id",[authMiddleware],errorHandler(changeQuantity))


export default cartRoute;
