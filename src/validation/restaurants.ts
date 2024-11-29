import { z } from "zod";
import {ErrorHanlding} from "@InnerTypes/error/error"
import {numericString} from "@helpers/zodhelper"
export const insert = z.object({
  name: z
  .string()
  .transform((val) => {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) {
        return parsed.map(item => {
          if (typeof item.text === 'string' && typeof item.langName === 'string') {
            return { text: item.text, langName: item.langName };
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
    expire_date: z.string(),
    name_symbol: z.string(),
    user_id: numericString(z.number()),
})


export const getOne = z.object({
  lang_id: numericString(z.number())
});
