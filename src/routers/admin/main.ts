import { Hono } from "hono";
import { logAdmin } from "./log";
import authAdmin from "@helpers/authAdmin";
import * as  types from "@InnerTypes/admins/module";
import { handlingUsers } from "./handlingUsers";
const adminRouter = new Hono<{
    Variables: {
        user: types.adminInfo,
        token: string
    }
}>();
// log in
adminRouter.route('/log', logAdmin);
// info
adminRouter.use(authAdmin)
adminRouter.get("/info", (c) => c.json(c.var.user));
// 
adminRouter.route("/users", handlingUsers);

export default adminRouter
