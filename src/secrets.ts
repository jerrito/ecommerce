import dotenv from "dotenv";

dotenv.config({path:".env"});

export const PORT=process.env.PORT;

export const tokenKey=process.env.tokenKey!;

const myToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU4NTU1OTd9.aWFu5T5iTbKO38hntvxzRsXEmLHBsAJp_KTdMQvyxyw";