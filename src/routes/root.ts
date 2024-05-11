import  {Router} from "express";
import authRoute from "./auth";
import productRoute from "./products";
import authMiddleware from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";


const rootRoute: Router=Router();

// auth
rootRoute.use("/auth",authRoute);


// products
rootRoute.use("/products",[authMiddleware,adminMiddleware],productRoute);


export default rootRoute;