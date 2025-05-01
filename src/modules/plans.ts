import Pool from "@Pool";
import * as  types from "@InnerTypes/plans";
import ErrorHanlding from "@InnerTypes/error/error";

export const insertOne: types.insertOne = async (name, symbol, admin_id) => {
    if (!name.trim() || !symbol.trim() || !admin_id)
        throw new Error(ErrorHanlding.mssing_info);

    const { rows } = await Pool.query<{ id: number }>(`
        insert into plans(name,symbol,admin_id)
        values($1,$2,$3) returning id 
        `, [name, symbol, admin_id]);
    return { name, id: rows[0].id, symbol };
}

export const getAll: types.getAll = async () => {
    const { rows } = await Pool.query<types.planInfo>(`select id,name,symbol from plans `)
    return rows;
}