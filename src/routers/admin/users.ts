import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import * as zAdmin from "@validation/admin";
import * as users from "@modules/users"
import * as types from "@InnerTypes/admins/module"
import zodErrorHanlding from "@helpers/errorHandling";
const app = new Hono<{
    Variables: {
        user: types.adminInfo,
        token: string
    }
}>();
// add
app.post('/', zValidator("json", zAdmin.logup, zodErrorHanlding), async (c) => {
    const { name, password, email } = c.req.valid("json");
    const data = await users.insertOne(name, password, email, c.var.user.id);
    return c.json(data)
})
// get
app.get('/', async (c) => {
    const next = await c.req.query("next");
    const user = await users.getAll(next !== undefined ? Number(next) : undefined);

    return c.json(user)
})


export default app
export { app as users }