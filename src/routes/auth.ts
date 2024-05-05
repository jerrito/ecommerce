import express, {Express, Request, Response, Router} from "express";
import {signup, me, login} from "../controllers/auth";

const authRoute:Router=Router();


authRoute.post("/signup",signup)

authRoute.post("/login",login)


authRoute.post("/me",me)


export default authRoute;
