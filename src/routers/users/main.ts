import { Hono } from "hono";

import authAdmin from "@middleware/authAdmin";
import * as  types from "@InnerTypes/admins/module";
import { userlog } from "./log";



const branchRouter = new Hono<{
    Variables: {
        user: types.adminInfo,
        token: string
    }
}>();
// log in
branchRouter.route('/users', userlog)

export default branchRouter
