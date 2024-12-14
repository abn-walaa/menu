import { InsertObject } from "@InnerTypes/translation";

export type addons = {
    title: InsertObject,
    addons: InsertObject[]
}
export type productOutPut = {
    imgs: string[], user_id: number, discount: number | null, restaurant_id: number,
    category_name: string | null, category_id: number | null, name: string | null,
}
export type insertOne = (user_id: number, name: InsertObject[],
    price: number, discount: number | undefined,
    imgs: File[] | File, restaurant_id: number,
    category_id: number | undefined) =>
    Promise<{ id: number }>;

export type getAllForR = (restaurant_id: number, lang_id: number) => Promise<productOutPut[]>