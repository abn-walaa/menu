import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import * as zAdmin from "@validation/admin";
import * as UserDb from "@modules/users"
import * as types from "@InnerTypes/admins/module"
import zodErrorHanlding from "@helpers/errorHandling";
const app = new Hono<{
    Variables: {
        user: types.adminInfo,
        token: string
    }
}>();

app.post('/', zValidator("json", zAdmin.addingUser, zodErrorHanlding), async (c) => {
    const { email, password, name } = c.req.valid("json");
    console.log(c.var.user)
    const user = await UserDb.insertOne(name, password, email, c.var.user.id);
    return c.json({
        ...user
    })
})

app.get('/', zValidator("query", zAdmin.next, zodErrorHanlding), async (c) => {
    const { next } = c.req.valid("query");

    const users = await UserDb.getAll(next);

    return c.json(users)

})
// app.post('/in', zValidator("json", zAdmin.login, zodErrorHanlding), async (c) => {
//     const { email, password } = c.req.valid("json");
//     const user = await UserDb.checkUser(email, password);
//     const token = await UserDb.genToken(user.id);
//     return c.json({ token, ...user })
// })


export default app
export { app as handlingUsers }