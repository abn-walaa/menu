import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import * as zAdmin from "@validation/admin";
import * as usersDB from "@modules/users"

import zodErrorHanlding from "@helpers/errorHandling";
const app = new Hono();



app.post('/in', zValidator("json", zAdmin.login, zodErrorHanlding), async (c) => {
    const { email, password } = c.req.valid("json");
    const user = await usersDB.checkUser(email, password);
    const token = await usersDB.genToken(user.id);
    return c.json({ token, ...user })
})

app.post('/up', zValidator("json", zAdmin.login, zodErrorHanlding), async (c) => {
    const { email, password } = c.req.valid("json");
    const user = await usersDB.checkUser(email, password);
    const token = await usersDB.genToken(user.id);
    return c.json({ token, ...user })
})

export default app
export { app as userlog }