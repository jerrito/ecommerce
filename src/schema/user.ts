import {z} from "zod";

export const SignupSchema=z.object({
    userName:z.string(),
    email:z.string().email(),
    password:z.string().min(6),
});


export const UpdateSchema=z.object({
    userName:z.string().nullable(),
    defaultShippingAddressId:z.number(),
    defaultBillingAddressId:z.number(),
})