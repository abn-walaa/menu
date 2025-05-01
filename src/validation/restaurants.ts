import { z } from "zod";
import { ErrorHanlding } from "@InnerTypes/error/error"
import { numericString, zodParesJSON, zodNamesLang } from "@helpers/zodhelper"

export const insert = z.object({

  name: zodParesJSON(zodNamesLang),

  logo: z.custom<File>(v => v instanceof File, { message: ErrorHanlding.img_required }),
  colors: zodParesJSON(z.array(z.string())),
  supported_langs: zodParesJSON(z.array(z.number())),
  expire_date: z.string().time(),
  name_symbol: z.string().regex(/^[A-Za-z]+$/),
  user_id: numericString(z.number()),
})


export const getOne = z.object({
  lang_id: numericString(z.number())
});
