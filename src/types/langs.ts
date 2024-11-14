export type insert = (name: string) =>
    Promise<{ id: number}>;

export type getall = ()=>
    Promise<{ id: number, name: string }[]>

