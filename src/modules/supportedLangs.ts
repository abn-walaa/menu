import Pool from "@Pool";
import * as types from "@InnerTypes/supportedLangs";
import ErrorHandles from "@InnerTypes/error/error";


export const insert: types.insert = async (langId, restaurantsId) => {
    
    if (!langId || restaurantsId) {
        throw new Error(ErrorHandles.mssing_info)
    }
    const { rows } = await Pool.query<{ id: number }>(`INSERT INTO supported_langs (lang_id,restaurants_id) VALUES ($1,$2) RETURNING id`, [langId, restaurantsId]);
    return { id: rows[0].id };
}

export const getbyid: types.getbyid = async (id) => {
    const { rows } = await Pool.query<{ id: number, langId: number, restaurantsId: number }>(`SELECT id,lang_id,restaurants_id FROM supported_langs where id=$1`, [id]);
    return rows
}

