import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import * as zUser from "@validation/user/log";
import * as User from "@modules/users"

import zodErrorHanlding from "@helpers/errorHandling";
const app = new Hono();


app.post('/in', zValidator("json", zUser.login, zodErrorHanlding), async (c) => {
    const { email, password } = c.req.valid("json");
    const user = await User.checkUser(email, password);
    const token = await User.genToken(user.id);
    return c.json({ token, ...user })
})


export default app
export { app as logAdmin }
