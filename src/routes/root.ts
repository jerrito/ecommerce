import  {Router} from "express";
import authRoute from "./auth";


const rootRoute: Router=Router();

rootRoute.use("/auth",authRoute);

export default rootRoute;