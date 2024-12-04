import { InsertObject } from "@InnerTypes/translation";

type addons = {
    title: InsertObject,
    addons: InsertObject[]
}

export const insertOne = (user_id: number, price: number, discount: number | undefined,
    imgs: File[], restaurant_id: number,
    category_id: number | undefined,
    addons: addons[] | undefined) =>
    Promise<{ id: number }>;

