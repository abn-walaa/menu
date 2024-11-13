import { z } from 'zod';

export const insertOne = z.object({
    name: z.string()
})
console.dir(insertOne.safeParse({ name: 121 }).error?.issues[0].message, { depth: null })
