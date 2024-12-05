import { zodNamesLang, zodParesJSON } from "@helpers/zodhelper";
import { z } from "zod";

export const insert = z.object({
    name: zodParesJSON(zodNamesLang),
    img: z.custom<File>(e => e instanceof File)
})