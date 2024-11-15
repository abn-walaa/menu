import { Hono } from "hono";
import { logAdmin } from "./log";
import authAdmin from "@helpers/authAdmin";
import * as  types from "@InnerTypes/admins/module";
const adminRouter = new Hono<{
    Variables: {
        user: types.adminInfo,
        token: string
    }
}>();
// log in
adminRouter.route('/log', logAdmin);
// 
adminRouter.get("/aa", authAdmin, (c) => c.json({ user: c.var.user, token: c.var.token }))
export default adminRouter
