import { InsertObject } from "@InnerTypes/translation";

export type insert = (names: InsertObject[], img: File, user_id: number, restaurant_id: number) =>
    Promise<{ id: number, names: InsertObject[], img: string }>

export type getById = (id: number, restaurant_id: number) => Promise<{ id: number, restaurant_id: number }>
export type getAllForRestaurant = (restaurant_id: number) => Promise<{ id: number, img: string }[]>