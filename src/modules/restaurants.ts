import Pool from "@Pool";
import * as types from "@InnerTypes/restaurants";
import ErrorHandles from "@InnerTypes/error/error";
import { insert as translation } from "@modules/translation";
import { save } from "@helpers/saveImage";
import { generateFileName } from "@helpers/generateImgName";
import { date } from "zod";

export const insert: types.insert = async (name, logo, colors, expire_date,
    name_symbol, admin_id, user_id) => {

    const imgData = {
        fileName: generateFileName(),
        buffer: Buffer.from(await logo.arrayBuffer())
    };


    if ((colors.length == 0) || !expire_date || !name_symbol || !admin_id || !user_id) {
        throw new Error(ErrorHandles.mssing_info);
    }
    const client = await Pool.connect();


    const textkey_id = await translation(name);
    try {
        await client.query('BEGIN');
        const { rows } = await client.query<{ id: number }>(`INSERT INTO restaurants (logo, colors, expire_date, name_symbol, 
                admin_id, user_id)VALUES($1,$2,$3,$4,$5,$6) RETURNING id`, [imgData.fileName, colors, expire_date, name_symbol, admin_id, user_id]);

        await client.query(`INSERT INTO branches (is_main,name_id,user_id,restaurants_id)
                    VALUES ($1,$2,$3,$4)`, [true, textkey_id.id, user_id, rows[0].id]);

        await save(imgData.fileName, imgData.buffer);
        await client.query('COMMIT');
        return {
            id: rows[0].id, name, colors,
            expire_date, name_symbol,
            user_id, logoName: imgData.fileName
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

export const getone:types.getone=async(restaurant_id,langName)=>{
    
    if(!restaurant_id||!langName){
        throw new Error(ErrorHandles.mssing_info);
    }
    let {rows}=await Pool.query<types.OutputGetOne>(`SELECT r.id,tr.text as name,r.logo,r.colors,r.expire_date,r.name_symbol,r.time,r.admin_id,r.user_id
            from restaurants r 
            inner join branches br on br.restaurants_id = r.id
            inner join langs l on l.name=$2    
            inner join textkeys te ON te.id = br.name_id
            inner join translation tr ON tr.lang_id = l.id and tr.textkey_id=te.id
            where r.id=$1 `,[restaurant_id,langName])
            return rows[0];
}


