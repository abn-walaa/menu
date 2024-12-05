import { InsertObject } from "@InnerTypes/translation";

export type addons = {
    title: InsertObject,
    addons: InsertObject[]
}

export const insertOne = (user_id: number, name: InsertObject[],
    price: number, discount: number | undefined,
    imgs: File[], restaurant_id: number,
    category_id: number | undefined) =>
    Promise<{ id: number }>;