import {z} from "zod";

export const addressValidator=z.object({
    formattedaddress:z.string(),
    lat:z.number(),
    lng:z.number(),
    country:z.string(),
    city:z.string(),

})