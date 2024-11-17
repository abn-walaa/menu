import { Hono } from "hono";
import * as langs from "@modules/langs"
import zodErrorHanlding from "@helpers/errorHandling";
import * as zlangs from "@validation/langs";
import * as types from "@InnerTypes/admins/module"
import { zValidator } from "@hono/zod-validator";

const app = new Hono<{
        Variables: {
                user: types.adminInfo,
                token: string
        }
}>();



app.post('/insert', zValidator("json", zlangs.insert, zodErrorHanlding), async (c) => {
        const { name } = c.req.valid('json');

        const languages = await langs.insertOne(name, c.var.user.id);
        return c.json(languages, 200);

})


app.get('/getall', async (c) => {
        const languages = await langs.getall();
        return c.json(languages, 200);
});

export default app;
export { app as langs }