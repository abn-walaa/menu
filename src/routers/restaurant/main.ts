import { Hono } from "hono";

import authAdmin from "@middleware/authAdmin";
import * as  types from "@InnerTypes/admins/module";
import authUser from "@middleware/authUser";
import authTheOwnerTemp from "@middleware/authTheOwnerTemp";
import { insert } from "@validation/product"
import { zValidator } from "@hono/zod-validator";
import zodErrorHanlding from "@helpers/errorHandling";
import categoryRotuer from "./category";
import productRouter from "./products";
import infoRouter from "./info";



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


restaurantRouter.route('/category', categoryRotuer)
restaurantRouter.route('/product', productRouter)

export default restaurantRouter
