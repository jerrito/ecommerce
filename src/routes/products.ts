import express, {Express, Request, Response, Router} from 'express';
import { prismaClient } from '..';
import { NextFunction } from 'express';
import { addProduct, deleteProductById, getProductById, getProducts, updateProductById } from '../controllers/product';
import { errorHandler } from '../error_handler';
import authMiddleware from '../middlewares/auth';
import { adminMiddleware } from '../middlewares/admin';


const productRoute: Router=express.Router();

productRoute.post("/products",errorHandler(addProduct));
    
productRoute.get("/products",errorHandler(getProducts));
    
productRoute.get("/product:id",errorHandler(getProductById));
    
 productRoute.put("/product:id",errorHandler(updateProductById));

productRoute.delete("/product:id",errorHandler(deleteProductById));


    
export default productRoute;