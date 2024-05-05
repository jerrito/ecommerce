import dotenv from "dotenv";

dotenv.config({path:".env"});

export const PORT=process.env.PORT;

export const tokenKey=process.env.tokenKey!;