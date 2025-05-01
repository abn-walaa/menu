import Pool from "@Pool";
import * as types from "@InnerTypes/roles";
import ErrorHanlding from "@InnerTypes/error/error";



export const insertOne: types.insertOne = async (name, admin_id) => {
    if (!name.trim() || !admin_id) throw new Error(ErrorHanlding.mssing_info);

    const { rows } = await Pool.query<{ id: number }>(`
        insert into roles(name,admin_id) values($1,$2) returning id
        `, [name, admin_id])

    return { id: rows[0].id, name }
}

export const getAll: types.getAll = async () => {
    const { rows } = await Pool.query<types.info>(`
        select id,name from roles
        `)

    return rows
}
