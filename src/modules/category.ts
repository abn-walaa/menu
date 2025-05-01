import Pool from "@Pool";
import * as  types from "@InnerTypes/category";
import ErrorHanlding from "@InnerTypes/error/error";
import { getbyRestaurant } from "@modules/supportedLangs";
import { insert2 } from "@modules/translation";
import { generateFileName } from "@helpers/generateImgName";
import { save } from "@helpers/saveImage";
export const insert: types.insert = async (names, img, user_id, restaurant_id) => {
    if (!user_id || !restaurant_id || names.length === 0) throw new Error(ErrorHanlding.mssing_info);
    console.log("asd")
    const supportedLangs = await getbyRestaurant(restaurant_id);
    const imgName = generateFileName();
    const client = await Pool.connect();
    try {
        console.log(supportedLangs)
        await client.query(`BEGIN;`)
        const textkeyId = await insert2(names, client, supportedLangs);
        const { rows } = await client.query(`
            insert into category(img,user_id,textkey_id,restaurants_id)
            values($1,$2,$3,$4) returning id
            `, [imgName, user_id, textkeyId, restaurant_id])
        await save(imgName, await img.arrayBuffer());
        await client.query(`commit;`)
        return { id: rows[0].id, img: imgName, names }
    } catch (error) {
        await client.query(`rollback;`)
        throw error
    } finally {
        client.release()
    }
}

export const getById: types.getById = async (id, restaurant_id) => {
    if (!id || !restaurant_id) throw new Error(ErrorHanlding.mssing_info);
    const { rows } = await Pool.query<{ id: number, restaurants_id: number }>(`
        select id,restaurants_id from
        category where id=$1 and restaurants_id=$2  `, [id, restaurant_id]);

    if (rows.length === 0 || restaurant_id !== rows[0].restaurants_id) throw new Error(ErrorHanlding.category_not_found);

    return { id: rows[0].id, restaurant_id: rows[0].restaurants_id };
}

export const getAllForRestaurant: types.getAllForRestaurant = async (id) => {
    if (!id) throw new Error(ErrorHanlding.mssing_info);
    const { rows } = await Pool.query<{ id: number, img: string }>(`select id,img from category where restaurants_id=$1`, [id]);
    return rows;
}