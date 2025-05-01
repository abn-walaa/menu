import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import * as zAdmin from "@validation/admin";
import * as AdminDb from "@modules/permissions"
import * as types from "@InnerTypes/admins/module"
import zodErrorHanlding from "@helpers/errorHandling";
const app = new Hono<{
    Variables: {
        user: types.adminInfo,
        token: string
    }
}>();

app.post('/', zValidator("json", zAdmin.permission, zodErrorHanlding), async (c) => {
    const { action, resourc } = c.req.valid("json");
    const id = await AdminDb.insertOne(action, resourc, c.var.user.id);

    return c.json(
        id
    )
})

app.get('/', async (c) => {
    const user = await AdminDb.getAll();
    return c.json(user)
})


export default app
export { app as permissions }