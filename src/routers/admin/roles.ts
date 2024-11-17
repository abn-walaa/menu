import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import * as zAdmin from "@validation/admin";
import * as AdminDb from "@modules/roles"
import * as types from "@InnerTypes/admins/module"
import zodErrorHanlding from "@helpers/errorHandling";
const app = new Hono<{
    Variables: {
        user: types.adminInfo,
        token: string
    }
}>();

app.post('/', zValidator("json", zAdmin.roles, zodErrorHanlding), async (c) => {
    const { name } = c.req.valid("json");
    const data = await AdminDb.insertOne(name, c.var.user.id);
    return c.json(data)
})

app.get('/', async (c) => {
    const user = await AdminDb.getAll();
    return c.json(user)
})


export default app
export { app as roles }