import { z } from "zod";

export const insert = z.object({
    name: z.string().min(3).max(30),
})