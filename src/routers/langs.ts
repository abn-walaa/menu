import { Hono } from "hono";
import * as langs from "@modules/langs"

const app = new Hono();

app.post('/insert', async (c) => {

        const { name } = await c.req.json();
        const languages = await langs.insertOne(name);
        return c.json(languages, 200);

})


app.get('/getall', async (c) => {

        const languages = await langs.getall();
        return c.json(languages, 200);

});

export default app;