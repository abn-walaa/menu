import { Hono } from "hono";

import * as  types from "@InnerTypes/admins/module";
import * as Restaurant from "@modules/restaurants";
import authUser from "@middleware/authUser";



const infoRouter = new Hono<{
    Variables: {
        user: types.adminInfo,
        token: string
    }
}>();
infoRouter.use(authUser)
infoRouter.get('/', async (c) => {
    const data = await Restaurant.getUserRretaurants(c.var.user.id);
    return c.json(data);
})
export default infoRouter
