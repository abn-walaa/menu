import Pool from "@Pool";
import * as types from "@InnerTypes/restaurants";
import ErrorHandles from "@InnerTypes/error/error";
import { insert as translation } from "@modules/translation";
import {save} from "@controller/saveImage";
import {generateFileName} from "@controller/generateImgName";

export const insert: types.insert = async (name, logo, colors, can_order = false, expire_date,
    name_symbol, admin_id, user_id, plan_id, is_main = false) => {
        
    const imgData = {
        fileName: generateFileName(),
        buffer: logo
      };
    

    if (!(colors.length == 0) || !expire_date || !name_symbol || !admin_id || !user_id || !plan_id) {
        throw new Error(ErrorHandles.mssing_info);
    }
    const client = await Pool.connect();
    const textkey_id = await translation(name);

    try {
        await client.query('BEGIN');
        const { rows } = await client.query<{ id: number }>(`INSERT INTO restaurants (logo, colors, can_order, expire_date, name_symbol, 
                admin_id, user_id, plan_id)VALUES($1,ARRAY $2,$3,$4,$5,$6,$7,$8) RETURNING id`, [imgData.fileName, colors, can_order, expire_date, name_symbol, admin_id, user_id, plan_id]);

        await client.query(`INSERT INTO branches (is_main, name_id, user_id, restaurants_id)
	                        VALUES ($1,$2,$3,$4`,[is_main,textkey_id,user_id,rows[0].id]);

        await save(imgData.fileName,logo);
        await client.query('COMMIT');
        return {
            id: rows[0].id, name, colors, can_order,
            expire_date, name_symbol,
            user_id, plan_id, logoName:imgData.fileName
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}
