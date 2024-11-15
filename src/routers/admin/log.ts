import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import * as zAdmin from "@validation/admin";
import * as AdminDb from "@modules/admins"

import zodErrorHanlding from "@helpers/errorHandling";
const app = new Hono();

app.post('/up', zValidator("json", zAdmin.logup, zodErrorHanlding), async (c) => {
    const { email, password, name } = c.req.valid("json");
    const user = await AdminDb.insertOne(name, password, email);
    const token = await AdminDb.genToken(user.id);
    return c.json({
        ...user, token
    })
})

app.post('/in', zValidator("json", zAdmin.login, zodErrorHanlding), async (c) => {
    const { email, password } = c.req.valid("json");
    const user = await AdminDb.checkUser(email, password);
    const token = await AdminDb.genToken(user.id);

    return c.json({ token, ...user })
})


export default app
export { app as logAdmin }