import Pool from "@Pool";
import * as  types from "@InnerTypes/admins/product";
import ErrorHanlding from "@InnerTypes/error/error";
import { getbyRestaurant } from "./supportedLangs";
import { insert2 } from "./translation";
import { generateFileName } from "@helpers/generateImgName";
import { save } from "@helpers/saveImage";

export const insert: types.insertOne = async (user_id, name, price, discount, imgs, restaurant_id, category_id) => {
    if (!user_id || !restaurant_id) throw new Error(ErrorHanlding.mssing_info);
    const imgs_names: string[] = [];

    if (Array.isArray(imgs)) {
        if (imgs.length === 0) throw new Error(ErrorHanlding.mssing_info)
        imgs.forEach(e => {
            e.prototype = { imgName: generateFileName() };
            imgs_names.push(e.prototype.imgName)
        })
    } else {


        imgs.prototype = { imgName: generateFileName() };
        imgs_names.push(imgs.prototype.imgName)
    }
    const supported_langs = await getbyRestaurant(restaurant_id);

    const client = await Pool.connect();
    try {
        await client.query(`BEGIN;`)
        const textkeyId = await insert2(name, client, supported_langs);

        const { rows } = await client.query<{ id: number }>(`insert into products
            (user_id,restaurants_id,category_id,imgs,discount,textkey_id,price) 
            values ($1,$2,$3,$4,$5,$6,$7) returning id;
            `, [user_id, restaurant_id, category_id, imgs_names, discount, textkeyId, price]);

        if (Array.isArray(imgs)) {
            for (let i = 0; i < imgs.length; i++) {
                const element = imgs[i];
                await save(element.prototype.imgName, await element.arrayBuffer());
            }
        } else {
            await save(imgs.prototype.imgName, await imgs.arrayBuffer())
        }
        await client.query(`commit;`);
        return { id: rows[0].id };
    } catch (error) {
        await client.query(`rollback;`)
        throw error;
    } finally {
        client.release();
    }
}

export const getAllForR: types.getAllForR = async (restaurant_id, lang_id) => {
    if (!restaurant_id || !lang_id) throw new Error(ErrorHanlding.mssing_info);
    const { rows } = await Pool.query<types.productOutPut>(`
        select p.imgs,p.user_id,p.discount,p.restaurants_id,ct.text category_name, p.category_id , t.text name  from products p 
        left join category c on c.id = p.category_id
        left join translation t on t.textkey_id=p.textkey_id and t.lang_id=$2
        left join translation ct on ct.textkey_id=c.textkey_id and t.lang_id=$2
        where p.restaurants_id=$1
        `, [restaurant_id, lang_id])

    return rows;
}
