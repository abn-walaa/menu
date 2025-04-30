import Pool from "@Pool";
import * as types from "@InnerTypes/langs";
import ErrorHanlding from "@InnerTypes/error/error";


export const insertOne: types.insert = async (name, admin_id, symbol) => {

    if (!name || !admin_id) {
        throw new Error(ErrorHanlding.mssing_info)
    }
    const { rows } = await Pool.query<{ id: number, name: string, symbol: string }>(`INSERT INTO langs (name,admin_id,symbol) VALUES ($1,$2,$3) RETURNING id,name`, [name, admin_id, symbol]);
    return { id: rows[0].id, name: rows[0].name, symbol: rows[0].symbol };
}

export const getall: types.getall = async () => {
    const { rows } = await Pool.query<{ id: number, name: string, symbol: string }>(`SELECT id,name,symbol FROM langs`);
    return rows
}

