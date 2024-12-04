import { z } from "zod";

export const insert = z.object({
    price: z.number()
})