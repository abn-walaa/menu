import Pool from "@Pool";
import * as types from "@InnerTypes/langs";

  
export const insertOne: types.insert = async (name) => {

    if(!name){
        throw new Error('name is required');
    }
    const {rows}=await Pool.query(`INSERT INTO users (name) VALUES ($1) RETURNING id`,[name]);
    return rows[0].id;
}

