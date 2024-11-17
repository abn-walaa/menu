export type info = {
    id: number,
    role_id: number,
    permission_id: number
}
export type infoDb = {
    role_name: string,
    permission_name: string,
    id: number,
    role_id: number,
    permission_id: number
}
export type addPermissionToRole = (role_id: number, permission_id: number, admin_id: number) => Promise<{ id: number }>;

export type checkIfExists = (role_id: number, permission_id: number) => Promise<boolean>
export type getAllForPermission = () => Promise<{ [data: string]: string[] }[] | undefined>
export type getAll = () => Promise<infoDb[]>