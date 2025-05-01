import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import * as zProduct from "@validation/product";

import * as types from "@InnerTypes/admins/module"
import zodErrorHanlding from "@helpers/errorHandling";


const app = new Hono<{
    Variables: {
        user: types.adminInfo,
        token: string
    }
}>();

app.post('/', zValidator("form", zProduct.insert, zodErrorHanlding), async (c) => {
    const data = c.req.valid("form");

    // const data = await AdminDb.insertOne(name, c.var.user.id);
    return c.json(data)
})

export default app;