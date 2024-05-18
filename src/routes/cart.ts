import express, {Express, Request, Response, Router} from "express";
import { addItemToCart, changeQuantity, deleteItemToCart, getCart } from "../controllers/cart";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../error_handler";


const cartRoute:Router=express.Router();


cartRoute.post("/cart",errorHandler(addItemToCart))

cartRoute.get("/cart",errorHandler(getCart))

cartRoute.delete("/cart/:id",errorHandler(deleteItemToCart))

cartRoute.put("/cart/:id",errorHandler(changeQuantity))


export default cartRoute;
