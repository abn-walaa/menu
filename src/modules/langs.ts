import Pool from "@Pool";
import * as types from "@InnerTypes/langs";
import ErrorHanlding from "@InnerTypes/error/error";


export const insertOne: types.insert = async (name, admin_id) => {

    if (!name || !admin_id) {
        throw new Error(ErrorHanlding.mssing_info)
    }
    const { rows } = await Pool.query<{ id: number, name: string }>(`INSERT INTO langs (name,admin_id) VALUES ($1,$2) RETURNING id,name`, [name, admin_id]);
    return { id: rows[0].id, name: rows[0].name };
}

export const getall: types.getall = async () => {
    const { rows } = await Pool.query<{ id: number, name: string }>(`SELECT id,name FROM langs`);
    return rows
}