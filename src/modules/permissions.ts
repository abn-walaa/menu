import Pool from "@Pool";
import * as types from "@InnerTypes/permissions";
import ErrorHanlding from "@InnerTypes/error/error";


export const check: types.check = async (action, resource) => {
    if (!action || !resource) throw new Error(ErrorHanlding.mssing_info);
    const { rows, rowCount } = await Pool.query<{ id: number }>(`
        select id from permissionses
        where action=$1 and resource=$2
        `, [action, resource])

    return rows.length > 0
}

export const insertOne: types.insertOne = async (action, resource, admin_id) => {
    if (!action || !resource || !admin_id) throw new Error(ErrorHanlding.mssing_info);
    if ((await check(action, resource)) === true) {
        throw new Error(ErrorHanlding.the_action_and_resc_used)
    }
    const { rows } = await Pool.query<{ id: number }>(`
        insert into permissionses(action,resource,admin_id) values($1,$2,$3) returning id
        `, [action, resource, admin_id])

    return { id: rows[0].id, action, resource }
}

export const getAll: types.getAll = async () => {
    const { rows } = await Pool.query<types.info>(`
        select id,action,resource from permissionses
        `)
    return rows
}

