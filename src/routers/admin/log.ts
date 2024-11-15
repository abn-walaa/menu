import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import * as zAdmin from "@validation/admin";
import * as AdminDb from "@modules/admins"
import { HTTPException } from "hono/http-exception";

import zodErrorHanlding from "@helpers/errorHandling";
import ErrorHanlding from "@InnerTypes/error/error";
const app = new Hono();

app.post('/', zValidator("json", zAdmin.logup, zodErrorHanlding), async (c) => {
    const { email, password, name } = c.req.valid("json");
    const user = await AdminDb.insertOne(name, password, email);
    const token = await AdminDb.genToken(user.id);
    return c.json({
        ...user, token
    })
})
app.get('/', c => c.text("hi"))
export default app