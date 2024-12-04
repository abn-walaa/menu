import { Hono } from "hono";
import * as Restaurants from "@modules/restaurants"
import zodErrorHanlding from "@helpers/errorHandling";
import * as zRestaurant from "@validation/restaurants";
import * as types from "@InnerTypes/admins/module"
import { zValidator } from "@hono/zod-validator";
import { createMiddleware } from 'hono/factory';


const app =new Hono<{
    Variables: {
        user: types.adminInfo,
        token: string
    }
}>();



app.post('/insert', zValidator("form", zRestaurant.insert, zodErrorHanlding), async (c) => {
    const { name, logo, colors, expire_date,
        name_symbol, user_id,supported_langs} = c.req.valid('form');
        
    const restaurant = await Restaurants.insert(name,logo, colors, expire_date,
        name_symbol,c.var.user.id, user_id,supported_langs);
    return c.json(restaurant, 200);

})

app.get('/:id{[0-9]+}',zValidator("query",zRestaurant.getOne,zodErrorHanlding),async(c)=>{
    const {id}=c.req.param();
    let {lang_id} = c.req.valid('query');
    const restaurant = await Restaurants.getone(Number(id),lang_id);
    return c.json(restaurant,200)
})


export default app;
export { app as Restaurants}

