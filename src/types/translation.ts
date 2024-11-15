type InsertObject = {
    text: string;
    langName: string;
};

export type insert = (items: InsertObject[]) =>
    Promise<{ id: number }>;

export type getbylangname = (langName: string) =>
    Promise<{ id: number, langName: string, contextId: number, text: string }[]>;

export type getByKeyId = (keyTextId: number) =>
    Promise<{ id: number, langName: string, contextId: number, text: string }[]>;

export type getByBoth = (keyTextId: number, langName: string) =>
    Promise<{ id: number, langName: string, contextId: number, text: string }[]>;

export type deleteone = (keyTextId: number, langID: number) =>
    Promise<boolean>;

