import { z } from "zod";
// log Router
export const logup = z.object({
    name: z.string().min(2).max(64),
    email: z.string().email(),
    password: z.string().min(8)
})

export const login = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})
// handling User router
export const addingUser = z.object({
    name: z.string().min(2).max(64),
    email: z.string().email(),
    password: z.string().min(8)
})
export const next = z.object({
    next: z.number().gte(0).optional()
})