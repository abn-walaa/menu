type InsertObject = {
    text: string;
    langName: string;
};
export type OutputGetOne={
    id: number, name: string, colors: string[],logo:string,
    expire_date: string, name_symbol: string,time:Date
    user_id: number,logoName: string,
    admin_id:number,
}


export type insert = (name:  InsertObject[], logo: File, colors: string[],
    expire_date: string, name_symbol: string,
    admin_id: number, user_id: number) =>
    Promise<{
        id: number, name: InsertObject[], colors: string[], 
        expire_date: string, name_symbol: string,
        user_id: number,logoName: string,
    }>;
export type getone =(restaurant_id:number,langName:string)=>Promise<OutputGetOne>;