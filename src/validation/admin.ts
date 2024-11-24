import ErrorHanlding from "@InnerTypes/error/error";
import { symbol, z } from "zod";
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
// plans handling 
export const plans = z.object({
    name: z.string().min(1),
    symbol: z.string(),
})
// Permission
const actions = z.union([
    z.literal("view"),
    z.literal("update"),
    z.literal("create"),
    z.literal("delete")
]);
const resources = z.union([
    z.literal("products"),
    z.literal("orders")
]);
export const permission = z.object({
    action: actions,
    resourc: resources
})
// Role 
export const roles = z.object({
    name: z.string()
})
// Permission - Role

export const permissionRole = z.object({
    role_id: z.number().gt(0),
    permission_id: z.number().gt(0)
})
