import { z, ZodTypeAny } from "zod";

export const numericString = (schema: ZodTypeAny) => z.preprocess((a) => {
  if (typeof a === 'string')
    return parseInt(a, 10)

  return a;

}, z.number());

export const zodParesJSON = (schema: ZodTypeAny) => z.preprocess((a) => {

  if (typeof a === "string")
    return JSON.parse(a);
  return a;
}, schema);

export const zodNamesLang = z.array(
  z.object({
    text: z.string(),
    lang_id: z.number()
  }
  ))

