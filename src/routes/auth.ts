import express, {Express, Request, Response, Router} from "express";
import {signup, me, login} from "../controllers/auth";
import { errorHandler } from "../error_handler";

const authRoute:Router=Router();


authRoute.post("/signup",errorHandler(signup))

authRoute.post("/login",errorHandler(login))


authRoute.post("/me",errorHandler(me))


export default authRoute;
