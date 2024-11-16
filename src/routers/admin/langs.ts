import { Hono } from "hono";
import * as langs from "@modules/langs"
import zodErrorHanlding from "@helpers/errorHandling";
import * as zlangs from "@validation/langs";
import { zValidator } from "@hono/zod-validator";
import * as  types from "@InnerTypes/admins/module";

const app = new Hono<{
        Variables: {
            user: types.adminInfo,
            token: string
        }
    }>();


app.post('/insert', zValidator("json",zlangs.insert , zodErrorHanlding),async (c) => {
 
        const { name} = c.req.valid('json');

        const languages = await langs.insertOne(name);
        return c.json(languages, 200);

})


app.get('/getall', async (c) => {
        const languages = await langs.getall();
        return c.json(languages, 200);
});

export default app;