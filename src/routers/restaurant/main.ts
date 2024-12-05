import { Hono } from "hono";

import authAdmin from "@middleware/authAdmin";
import * as  types from "@InnerTypes/admins/module";
import authUser from "@middleware/authUser";
import authTheOwnerTemp from "@middleware/authTheOwnerTemp";
import { insert } from "@validation/product"
import { zValidator } from "@hono/zod-validator";
import zodErrorHanlding from "@helpers/errorHandling";



const restaurantRouter = new Hono<{
    Variables: {
        user: types.adminInfo,
        token: string,
        restaurant: { id: number, user_id: number }
    }
}>();
// log in
restaurantRouter.use(authUser);

restaurantRouter.use(authTheOwnerTemp);

restaurantRouter.post('/product', zValidator("form", insert, zodErrorHanlding),
    async c => {


        return c.json(await c.req.valid("form"))
    })

export default restaurantRouter
