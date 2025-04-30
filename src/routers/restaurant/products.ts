import { Hono } from "hono";


import * as  types from "@InnerTypes/admins/module";

import { insert } from "@validation/product"
import { zValidator } from "@hono/zod-validator";
import zodErrorHanlding from "@helpers/errorHandling";
import * as Product from "@modules/products"


const productRouter = new Hono<{
    Variables: {
        user: types.adminInfo,
        token: string,
        restaurant: { id: number, user_id: number },
        lang: { id: number }
    }
}>();

productRouter.post('/', zValidator("form", insert, zodErrorHanlding), async c => {
    const { imgs, category_id, discount, name, price } = c.req.valid("form");
    const data = await Product.insert(c.var.user.id, name, price, discount, imgs, c.var.restaurant.id, category_id)
    return c.json(data);
})

productRouter.get('/', async c => {
    const data = await Product.getAllForR(c.var.restaurant.id, c.var.lang.id);
    return c.json(data);
})
export default productRouter
