export type insert = (langId: number,restaurantsId :number) =>
    Promise<{ id: number}>;

export type getbyid = (id: number) =>
    Promise<{ id: number,langId: number,restaurantsId :number}[]>;


