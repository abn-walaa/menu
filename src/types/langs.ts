export type insert = (name: string, admin_id: number, symbol: string) =>
    Promise<{ id: number, name: string, symbol: string }>;

export type getall = () =>
    Promise<{ id: number, name: string, symbol: string }[]>

