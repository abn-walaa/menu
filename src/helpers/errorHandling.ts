import *as z from "@hono/zod-validator"
import ErrorHanlding from "@InnerTypes/error/error"
import { HTTPException } from "hono/http-exception"


export const zodErrorHanlding = async (r: any, c: any) => {

    if (!r.success) {
        throw new HTTPException(400, { message: ErrorHanlding.invalid, cause: r.error.errors })
    }
}

export default zodErrorHanlding