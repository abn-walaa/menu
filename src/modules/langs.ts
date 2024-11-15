import Pool from "@Pool";
import * as types from "@InnerTypes/langs";
import ErrorHandles from "@InnerTypes/error/error";


export const insertOne: types.insert = async (name) => {

    if (!name) {
        throw new Error(ErrorHandles.mssing_info)
    }
    const { rows } = await Pool.query<{ id: number }>(`INSERT INTO langs (name) VALUES ($1) RETURNING id`, [name]);
    return { id: rows[0].id };
}

export const getall: types.getall = async () => {
    const { rows } = await Pool.query<{ id: number, name: string }>(`SELECT id,name FROM langs`);
    return rows
}
