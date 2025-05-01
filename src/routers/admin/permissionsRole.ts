import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import * as zAdmin from "@validation/admin";
import * as AdminDb from "@modules/rolePermissions"
import * as types from "@InnerTypes/admins/module"
import zodErrorHanlding from "@helpers/errorHandling";
const app = new Hono<{
    Variables: {
        user: types.adminInfo,
        token: string
    }
}>();

app.post('/', zValidator("json", zAdmin.permissionRole, zodErrorHanlding), async (c) => {
    const { permission_id, role_id } = c.req.valid("json");
    const id = await AdminDb.addPermissionToRole(role_id, permission_id, c.var.user.id);
    return c.json(
        id
    )
})

app.get('/', async (c) => {
    const user = await AdminDb.getAll();
    return c.json(user)
})


export default app
export { app as permissionsRole }