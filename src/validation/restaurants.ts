import { z } from "zod";
import {zodErrorHanlding} from "@helpers/errorHandling"
export const insert = z.object({
    name: z.array(
        z.object({
          text: z.string(),      
          langName: z.string(),
        })
      ),
    logo: z.instanceof(Buffer),
    colors:  z.array(z.string())
,
    can_order: z.boolean(),
    expire_date: z.string(),
    name_symbol: z.string(),
    admin_id: z.number().min(1),
    user_id: z.number().min(1),
    plan_id: z.number().min(1),
    is_main: z.boolean(),

})
name: z
.string() // Expect the input as a string
.transform((val) => {
  
    const parsed = JSON.parse(val);
    if (Array.isArray(parsed)) {
      return parsed.map(item => {
        if (typeof item.text === 'string' && typeof item.langName === 'string') {
          return { text: item.text, langName: item.langName };
        } else {
          throw new Error('Invalid structure for name items');
        }
      })
    }
})