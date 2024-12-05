type InsertObject = {
    text: string;
    lang_id: number;
};
export type OutputGetOne = {
    id: number, name: string, colors: string[], logo: string,
    expire_date: string, name_symbol: string, time: Date
    user_id: number, logoName: string,
    admin_id: number,
}


export type insert = (name: InsertObject[], logo: File, colors: string[],
    expire_date: string, name_symbol: string,
    admin_id: number, user_id: number, supported_langs: number[]) =>
    Promise<{
        id: number, name: InsertObject[], colors: string[],
        expire_date: string, name_symbol: string,
        user_id: number, logo: string,
    }>;
export type getone = (id: number, lang_id: number) => Promise<OutputGetOne>;
export type getOneData = (id: number) => Promise<{ id: number, user_id: number }>;