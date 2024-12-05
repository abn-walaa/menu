import { InsertObject } from "@InnerTypes/translation";

export type insert = (names: InsertObject, img: File) => Promise<{ id: number, names: InsertObject, img: string }>
