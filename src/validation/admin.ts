import { z } from "zod";

export const logup = z.object({
    name: z.string().min(2).max(64),
    email: z.string().email(),
    password: z.string().min(8)
})