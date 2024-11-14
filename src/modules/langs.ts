import Pool from "@Pool";
import * as types from "@InnerTypes/langs";
import * as ErrorHandles from "@InnerTypes/error/error";

  
export const insertOne: types.insert = async (name) => {

    if(!name){
        throw new Error(ErrorHandles.errorMessage.mssing_info)
    }
    const {rows}=await Pool.query<{ id: number }>(`INSERT INTO langs (name) VALUES ($1) RETURNING id`,[name]);
    return {id:rows[0].id};
}

export const getall:types.getall =async()=>{
    const {rows}=await Pool.query<{id:number,name:string}>(`SELECT * FROM langs`);
    return rows
}
