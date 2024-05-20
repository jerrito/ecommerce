import express from "express";
import authMiddleware from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";
import { errorHandler } from "../error_handler";
import { changeUserRole, listAllUsers } from "../controllers/admin";

const adminRoute= express.Router();


// get all users
adminRoute.get("/admin/all_users",errorHandler(listAllUsers));


// change role
adminRoute.put("/admin/:id/role",errorHandler(changeUserRole));

//get user by id
adminRoute.get("/user/:id/",errorHandler(changeUserRole));



export default adminRoute;