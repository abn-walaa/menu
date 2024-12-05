import * as jwt from "hono/jwt"
import { createMiddleware } from "hono/factory"
import { findByToken } from "@modules/admins"
import { HTTPException } from "hono/http-exception"
import ErrorHanlding from "@InnerTypes/error/error"
import { getone, getOneData } from "@modules/restaurants"

const authTheOwnerTemp = createMiddleware(async (c, next) => {
    const user_id = c.var.user.id;
    console.log(c.req.param())
    const id = c.req.param("restrant_id");
    console.log(id)
    const data = await getOneData(Number(id));

    if (data === undefined) throw new HTTPException(404, { message: ErrorHanlding.not_found })
    console.log(data, user_id)
    if (data.user_id !== user_id) {
        throw new Error(ErrorHanlding.dont_have_access);
    }
    c.set("restaurant", data);
    await next()
})

export default authTheOwnerTemp
