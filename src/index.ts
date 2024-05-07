import express, {Express, Request, Response} from "express";
import rootRoute from './routes/root';
import { PrismaClient } from "@prisma/client";
import { PORT } from "./secrets";
import { errorMiddleware } from "./middlewares/error";
import { signupSchema } from "./schema/user";


const app: Express=express();

app.use(express.json());
app.use("/api",rootRoute);



export const prismaClient=new PrismaClient({
    log:["query"],

})


app.get("/home",(req: Request,res: Response)=>{

    res.status(200).json({"success":"Ecommerce started"});
})

app.use(errorMiddleware);

app.listen(Number(PORT),"127.0.0.1",()=>{
    console.log(`Server is running on port ${PORT}`);
})