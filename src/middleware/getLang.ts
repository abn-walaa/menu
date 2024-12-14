import * as jwt from "hono/jwt"
import { createMiddleware } from "hono/factory"
import { findByToken } from "@modules/users"
import { HTTPException } from "hono/http-exception"
import ErrorHanlding from "@InnerTypes/error/error"
import { getall } from "@modules/langs"

const getLnag = createMiddleware(async (c, next) => {

    let lang = c.req.query('lang');
    const langs = await getall();
    console.log(langs)
    if (!lang) {
        const langData = langs.find(e => e.symbol === "en");
        c.set("lang", langData);
        await next()
        return;
    }

    let langData = langs.find(e => e.symbol === lang);
    if (!langData) {
        langData = langs.find(e => e.symbol === "en");
    }
    c.set("lang", lang);
    await next();
})

export default getLnag
