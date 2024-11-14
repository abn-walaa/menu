import { Hono } from "hono";
import * as langs from "@modules/langs"
import { HTTPException, } from 'hono/http-exception'
const app=new Hono();

app.post('/insert',async (c) => {
    try {
        const { name} = await c.req.json();
        const languages = await langs.insertOne(name);
        return c.json(languages, 200); 
    } catch (error) {
        const err = error as Error;
        throw new HTTPException(500, {
            message: "error", cause: {
              errormessage: err.message
            }}) 
    }
})


app.get('/getall', async (c) => {
    try {
        const languages = await langs.getall();
        return c.json(languages, 200); 
    } catch (error) {
        const err = error as Error;
        throw new HTTPException(500, {
            message: "error", cause: {
              errormessage: err.message
            }}) 
    }
});

export default app;