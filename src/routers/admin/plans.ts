import { Hono } from "hono";
import * as Plans from "@modules/plans"
import * as zAdmin from "@validation/admin";
import { zValidator } from "@hono/zod-validator";
import zodErrorHanlding from "@helpers/errorHandling";
import * as  types from "@InnerTypes/admins/module";

const plans = new Hono<{
    Variables: {
        user: types.adminInfo,
        token: string
    }
}>();

plans.get('/', async (c) => {
    const data = await Plans.getAll();
    return c.json(data)
})

plans.post('/', zValidator("json", zAdmin.plans, zodErrorHanlding), async (c) => {
    const { name, symbol } = await c.req.valid("json");
    const data = await Plans.insertOne(name, symbol, c.var.user.id);
    return c.json(data)
})



export default plans