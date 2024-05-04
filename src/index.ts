import express, {Express, Request, Response} from "express";

const app: Express=express();
const port: number=5000;


app.get("/home",(req: Request,res: Response)=>{

    res.status(200).json({"success":"Ecommerce started"});
})


app.listen(port,"127.0.0.1",()=>{
    console.log(`Server is running on port ${port}`);
})