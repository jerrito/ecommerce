import express, {Express, Request, Response, Router} from "express";
import { cancelOrderById, createOrders, getOrderById, getOrders } from "../controllers/order";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../error_handler";


const orderRoute:Router=express.Router();


orderRoute.get("/orders", errorHandler(getOrders))


orderRoute.post("/orders",errorHandler( createOrders))


orderRoute.get("/orders/:id",errorHandler(getOrderById))


orderRoute.get("/orders/:id",errorHandler(cancelOrderById))


export default orderRoute;
