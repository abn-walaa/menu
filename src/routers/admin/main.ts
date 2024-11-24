import { Hono } from "hono";
import { logAdmin } from "./log";
import authAdmin from "@middleware/authAdmin";
import * as  types from "@InnerTypes/admins/module";
import { handlingUsers } from "./handlingUsers";
import plans from "./plans";
import { roles } from "./roles";
import { permissions } from "./permissions";
import { permissionsRole } from "./permissionsRole";
import { langs } from "./langs";
import { Restaurants } from "./restaurants";


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
// plans
adminRouter.route("/plans", plans);
//
adminRouter.route("/role", roles);
// 
adminRouter.route("/permissions", permissions);
adminRouter.route("/role-permssions", permissionsRole);
adminRouter.route("/langs", langs);
adminRouter.route("/restaurants", Restaurants);
export default adminRouter
