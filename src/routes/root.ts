import  {Router} from "express";
import authRoute from "./auth";
import productRoute from "./products";
import authMiddleware from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";
import userRoute from "./user";
import orderRoute from "./order";
import cartRoute from "./cart";


const rootRoute: Router=Router();

// auth
rootRoute.use("/auth",authRoute);


// products
rootRoute.use([authMiddleware,adminMiddleware],productRoute);

// user 
rootRoute.use("/user",[authMiddleware],userRoute)

// order 
rootRoute.use( [authMiddleware],cartRoute)


// order
rootRoute.use([authMiddleware],orderRoute)

export default rootRoute;