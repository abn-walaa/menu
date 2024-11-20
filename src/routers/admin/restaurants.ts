import { Hono } from "hono";
import * as Restaurants from "@modules/restaurants"
import zodErrorHanlding from "@helpers/errorHandling";
import * as zRestaurant from "@validation/restaurants";
import * as types from "@InnerTypes/admins/module"
import { zValidator } from "@hono/zod-validator";
import { createMiddleware } from 'hono/factory';


const app = new Hono()



app.post('/insert', zValidator("form", zRestaurant.insert, zodErrorHanlding), async (c) => {
    const { name, logo, colors, can_order, expire_date,
        name_symbol, user_id, plan_id, is_main} = c.req.valid('form');
        
        
        
    const restaurant = await Restaurants.insert(name,  logo, colors, can_order, expire_date,
        name_symbol,c.user.id, user_id, plan_id, is_main);
    return c.json(restaurant, 200);

})
export default app;
export { app as Restaurants}

