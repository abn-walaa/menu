export type insert = (name: string, admin_id: number) =>
    Promise<{ id: number, name: string }>;

export type getall = () =>
    Promise<{ id: number, name: string }[]>

