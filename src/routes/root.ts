import  {Router} from "express";
import authRoute from "./auth";
import productRoute from "./products";
import authMiddleware from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";
import userRoute from "./user";
import orderRoute from "./order";
import cartRoute from "./cart";
import adminRoute from "./admin";
import  invalidUrl  from "./invalid_url";


const rootRoute: Router=Router();

// auth
rootRoute.use("/auth",authRoute);


// products
rootRoute.use([authMiddleware,adminMiddleware],productRoute);

// user 
rootRoute.use("/user",[authMiddleware],userRoute)

// cart
rootRoute.use( [authMiddleware],cartRoute)


// order
rootRoute.use([authMiddleware],orderRoute)


// admin
rootRoute.use([authMiddleware,adminMiddleware],adminRoute);


// invalid url
rootRoute.use("*",invalidUrl);



export default rootRoute;