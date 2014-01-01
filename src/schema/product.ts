import {z} from "zod";

export const productSchemaValidator=z.object({
    name:z.string(),
    description:z.string(),
    price:z.number().min(0.1).max(10000)

})