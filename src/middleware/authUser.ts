import * as jwt from "hono/jwt"
import { createMiddleware } from "hono/factory"
import { findByToken } from "@modules/users"
import { HTTPException } from "hono/http-exception"
import ErrorHanlding from "@InnerTypes/error/error"

const authUser = createMiddleware(async (c, next) => {

    let token = c.req.header('Authorization')
    if (token === undefined) {
        throw new Error('please provide a token')
    }
    token = token.replace('Bearer ', '');
    if (!token) {
        throw new Error('Authorization token missing')
    }

    const decoded = await jwt.verify(token, process.env.JWT_KEY ?? "test")
    const user = await findByToken(Number(decoded.user_id), token)
    console.log(user)
    if (!user) {
        throw new HTTPException(401, { message: ErrorHanlding.dont_have_access })
    }

    c.set('user', user)
    c.set('token', token)
    await next()
})

export default authUser
