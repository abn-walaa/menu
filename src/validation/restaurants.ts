import { z } from "zod";
import {ErrorHanlding} from "@InnerTypes/error/error"
import {numericString} from "@helpers/zodhelper"
export const insert = z.object({
  name: z
  .string()
  .transform((val) => {
      const parsed = JSON.parse(val);
      console.log(parsed)
      if (Array.isArray(parsed)) {
        return parsed.map(item => {
          if (typeof item.text === 'string' && typeof item.lang_id === 'number') {

            return { text: item.text, lang_id: item.lang_id };
          } else {
            throw new Error(ErrorHanlding.string);
          }
        });
      }else
      {
        throw new Error(ErrorHanlding.string);
      }
  }),
      logo: z.custom<File>(v => v instanceof File, { message: ErrorHanlding.img_required }),
      colors: z
      .string()
      .transform((e) => {
          const parsed = JSON.parse(e); // Parse JSON
          if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
            return parsed; // Valid array of strings
          }
        return []; // Return an empty array as a fallback
      })
,
supported_langs: z
.string()
.transform((e) => {
    const parsed = JSON.parse(e); // Parse JSON
    if (Array.isArray(parsed) && parsed.every((item) => typeof item === "number")) {
      return parsed; // Valid array of strings
    }
  return []; // Return an empty array as a fallback
}),
    expire_date: z.string(),
    name_symbol: z.string(),
    user_id: numericString(z.number()),
})


export const getOne = z.object({
  lang_id: numericString(z.number())
});
