import {z} from "zod";

export const cartSchemaValidator=z.object({

    quantity:z.number(),
    productId:z.number()


})


export const updateCartSchemaValidator=z.object({
    quantity:z.number(),
})