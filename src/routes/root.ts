import  {Router} from "express";
import authRoute from "./auth";
import productRoute from "./products";


const rootRoute: Router=Router();

rootRoute.use("/auth",authRoute);


rootRoute.use("/products",productRoute);
export default rootRoute;