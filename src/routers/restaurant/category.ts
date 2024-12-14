import { Hono } from "hono";


import * as  types from "@InnerTypes/admins/module";
import * as Category from "@modules/category";
import { insert } from "@validation/category"
import { zValidator } from "@hono/zod-validator";
import zodErrorHanlding from "@helpers/errorHandling";



const categoryRotuer = new Hono<{
    Variables: {
        user: types.adminInfo,
        token: string,
        restaurant: { id: number, user_id: number }
    }
}>();

categoryRotuer.post('/', zValidator("form", insert, zodErrorHanlding), async c => {
    const { img, names } = await c.req.valid("form");
    const data = await Category.insert(names, img, c.var.user.id, c.var.restaurant.id);
    console.log("0---------------0")
    console.log(data)
    return c.json(data);
})

categoryRotuer.get('/', async c => {
    const data = await Category.getAllForRestaurant(c.var.restaurant.id);
    return c.json(data);
})

categoryRotuer.get('/:id', async c => {
    const id = c.req.param("id");
    const data = await Category.getById(Number(id), c.var.restaurant.id);
    return c.json(data);
})

export default categoryRotuer
