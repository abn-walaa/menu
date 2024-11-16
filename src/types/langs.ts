export type insert = (name: string) =>
    Promise<{ id: number,name:string}>;

export type getall = ()=>
    Promise<{ id: number, name: string }[]>

