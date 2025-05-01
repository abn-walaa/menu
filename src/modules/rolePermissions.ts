import Pool from "@Pool";
import * as types from "@InnerTypes/rolePermissions";
import ErrorHanlding from "@InnerTypes/error/error";


export const rolesPermission = new Map<string, string[]>();
export const checkIfExists: types.checkIfExists = async (role_id, permission_id) => {
    if (!role_id || !permission_id) throw new Error(ErrorHanlding.mssing_info);
    const { rows } = await Pool.query<{ id: number }>(`
        select id from role_permissions
        where role_id=$1 and permission_id=$2
        `, [role_id, permission_id]);
    if (rows.length === 0) return true;
    return false
}

export const addPermissionToRole: types.addPermissionToRole = async (role_id, permission_id, admin_id) => {
    if (!role_id || !permission_id || !admin_id) throw new Error(ErrorHanlding.mssing_info);
    const check = await checkIfExists(role_id, permission_id);
    if (!check) throw new Error(ErrorHanlding.the_role_permission);
    const { rows } = await Pool.query<{ id: number }>(`
        insert into role_permissions (role_id,permission_id,admin_id) values($1,$2,$3)
        returning id
        `, [role_id, permission_id, admin_id])
    return { id: rows[0].id }
}


export const getAllForPermission: types.getAllForPermission = async () => {
    if (rolesPermission.size > 0) {
        return Array.from(rolesPermission.entries()).map(e => {
            return { [e[0]]: e[1] }
        })
    }
    const { rows } = await Pool.query<{ role_name: string, permission_action: string, permission_resource: string }>(`
        select r.name as role_name,p.action as permission_action,p.resource as permission_resource from  role_permissions rp
        inner join roles r on r.id=rp.role_id
        inner join permissionses p on p.id=rp.permission_id
        `)
    if (rows.length === 0) return undefined
    for (let i = 0; i < rows.length; i++) {
        const element = rows[i];
        let data = rolesPermission.get(element.role_name);
        if (data === undefined) {
            data = [element.permission_action + ":" + element.permission_resource];
            rolesPermission.set(element.role_name, data);
        } else {
            data.push(element.permission_action + ":" + element.permission_resource);
        }
    }

    return Array.from(rolesPermission.entries()).map(e => {
        return { [e[0]]: e[1] }
    })
}

export const getAll: types.getAll = async () => {
    const { rows } = await Pool.query<types.infoDb>(`
        select rp.id,r.id as role_id, r.name as role_name,p.action as permission_action,p.resource as permission_resource from  role_permissions rp
        inner join roles r on r.id=rp.role_id
        inner join permissionses p on p.id=rp.permission_id
        `)

    return rows;
}