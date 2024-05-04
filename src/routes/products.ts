import express, {Express, Request, Response, Router} from 'express';


const productRoute: Router=express.Router();

productRoute.post("/products",(req:Request,res: Response)=>{

    try{
    
    }catch(e){
    
    }
});
    
productRoute.get("/products",(req:Request,res: Response)=>{
    
        try{
        
        }catch(e){
            
        }
 });
    
productRoute.get("/product:id",(req:Request,res: Response)=>{
    
            try{
            
            }catch(e){
                
            }
 });
    
 productRoute.put("/product:id",(req:Request,res: Response)=>{
    
    try{
    
    }catch(e){
        
    }
});

productRoute.delete("/product:id",(req:Request,res: Response)=>{
    
    try{
    
    }catch(e){
        
    }
});


    
module.exports=productRoute;