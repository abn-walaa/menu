import { PoolClient } from "pg";

type InsertObject = {
    text: string;
    lang_id: number;
};


export type insert = (items: InsertObject[],client:PoolClient) =>
    Promise<{ id: number }>;

export type insert2 = (items: InsertObject[],client:PoolClient,supported_langs_id:number[]) =>
    Promise<{ id: number }>;

export type getbylangname = (langName: string) =>
    Promise<{ id: number, langName: string, contextId: number, text: string }[]>;

export type getByKeyId = (keyTextId: number) =>
    Promise<{ id: number, langName: string, contextId: number, text: string }[]>;

export type getByBoth = (keyTextId: number, langName: string) =>
    Promise<{ id: number, langName: string, contextId: number, text: string }[]>;

export type deleteone = (keyTextId: number) =>
    Promise<boolean>;

