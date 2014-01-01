import {z} from "zod";

export const SignupSchema=z.object({
    userName:z.string(),
    email:z.string().email(),
    password:z.string().min(6),
})