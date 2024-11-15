export type planInfo = {
    name: string,
    symbol: string,
    id: number
}
export type insertOne = (name: string, symbol: string, admin_id: number) =>
    Promise<planInfo>;

export type getAll = () => Promise<planInfo[]>