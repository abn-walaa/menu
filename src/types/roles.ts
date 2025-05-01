
export type info = {
    id: number,
    name: string
}

export type insertOne = (name: string, admin_id: number) => Promise<info>;
export type getAll = () => Promise<info[]>;
