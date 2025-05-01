import { z, ZodTypeAny } from "zod";
import * as zodHelper from "@helpers/zodhelper"
import ErrorHanlding from "@InnerTypes/error/error";



export const insert = z.object({
    category_id: zodHelper.numericString(z.number().int()).optional(),
    price: zodHelper.numericString(z.number().gte(0)),
    imgs: z.array(z.custom<File>(v => v instanceof File, { message: ErrorHanlding.img_required })).or(z.custom<File>(v => v instanceof File, { message: ErrorHanlding.img_required })),
    discount: zodHelper.numericString(z.number()).optional(),
    name: zodHelper.zodParesJSON(zodHelper.zodNamesLang)
})

