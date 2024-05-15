import { prismaClient } from ".."


export const addAddress=(req:Request,res:Response)=>{
  const {address,lat,lng,country}=req.body;
    const address=prismaClient.address.create({
        data:{

        }
    })
}