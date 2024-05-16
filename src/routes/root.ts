import  {Router} from "express";
import authRoute from "./auth";
import productRoute from "./products";
import authMiddleware from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";
import userRoute from "./user";


const rootRoute: Router=Router();

// auth
rootRoute.use("/auth",authRoute);


// products
rootRoute.use("/products",[authMiddleware,adminMiddleware],productRoute);

// user 
rootRoute.use("/user",[authMiddleware],userRoute)
export default rootRoute;