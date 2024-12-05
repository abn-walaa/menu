import { z, ZodTypeAny } from "zod";

export const numericString = (schema: ZodTypeAny) => z.preprocess((a) => {
  if (typeof a === 'string') {
    return parseInt(a, 10)
  } else if (typeof a === 'number') {
    return a;
  } else {
    return undefined;
  }
}, schema);

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

