import { z } from "zod";

export const insert = z.object({
    langId: z.number().min(1),
    restaurantsId: z.number().min(1),
})

export const getByid = z.object({
    id: z.number().min(1)
})