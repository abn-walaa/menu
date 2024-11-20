type InsertObject = {
    text: string;
    langName: string;
};


export type insert = (name:  InsertObject[], logo: Buffer, colors: string[], can_order: boolean,
    expire_date: string, name_symbol: string,
    admin_id: number, user_id: number, plan_id: number,is_main:boolean) =>
    Promise<{
        id: number, name: InsertObject[], colors: string[], can_order: boolean,
        expire_date: string, name_symbol: string,
        user_id: number, plan_id: number,logoName: string
    }>;
