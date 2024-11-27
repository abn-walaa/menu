import { Hono } from "hono";
import * as Restaurants from "@modules/restaurants"
import zodErrorHanlding from "@helpers/errorHandling";
import * as zRestaurant from "@validation/restaurants";
import * as types from "@InnerTypes/admins/module"
import { zValidator } from "@hono/zod-validator";
import { createMiddleware } from 'hono/factory';


const app = new Hono<{
    Variables: {
        user: types.adminInfo,
        token: string
    }
}>();



app.post('/insert', zValidator("form", zRestaurant.insert, zodErrorHanlding), async (c) => {
    const { name, logo, colors, expire_date,
        name_symbol, user_id } = c.req.valid('form');

    const restaurant = await Restaurants.insert(name, logo, colors, expire_date,
        name_symbol, c.var.user.id, user_id);
    return c.json(restaurant, 200);

})

app.get('/:restaurant_id/:langName', zValidator("param", zRestaurant.getOne, zodErrorHanlding), async (c) => {
    const { restaurant_id, langName } = c.req.valid("param");
    const restaurant = await Restaurants.getone(restaurant_id, langName);
    return c.json(restaurant, 200)
})


export default app;
export { app as Restaurants }

