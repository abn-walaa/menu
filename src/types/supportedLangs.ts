import { PoolClient } from "pg";

export type insert = (langId: number,restaurantsId :number) =>
    Promise<{ id: number}>;

export type insert_clinet = (langId: number[],restaurantsId :number,clinet:PoolClient) =>
    Promise<{ id: number}[]>;

export type getbyid = (id: number) =>
    Promise<{ id: number,langId: number,restaurantsId :number}[]>;


