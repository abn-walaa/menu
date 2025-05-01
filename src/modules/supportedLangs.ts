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

export const insert_client: types.insert_clinet = async (langId, restaurantsId, client) => {
    if (!langId.length || !restaurantsId) {
        throw new Error(ErrorHandles.mssing_info);
    }

    const { rows } = await client.query<{ id: number }>(
        `WITH inserted AS (
            INSERT INTO supported_langs (lang_id, restaurants_id)
            SELECT UNNEST($1::int[]), $2
            RETURNING id
        )
        SELECT id FROM inserted`,
        [langId, restaurantsId]
    );

    return rows;
};
export const getbyid: types.getbyid = async (id) => {
    const { rows } = await Pool.query<{ id: number, lang_id: number, restaurantsId: number }>(`SELECT 
        id,lang_id,restaurants_id
        FROM supported_langs where id=$1`, [id]);
    return rows
}
export const getbyRestaurant: types.getbyRestaurant = async (id) => {
    const { rows } = await Pool.query<{ id: number, lang_id: number, restaurantsId: number }>(`SELECT 
        id,lang_id,restaurants_id
        FROM supported_langs where restaurants_id=$1`, [id]);
    if (rows.length === 0) throw new Error(ErrorHandles.restaurant_not_found);
    return rows.map(e => e.lang_id)
}

