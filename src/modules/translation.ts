import Pool from "@Pool";
import * as types from "@InnerTypes/translation";
import ErrorHandles from "@InnerTypes/error/error";
import * as langs from "@modules/langs";


//texts is  array of object of text and langName as input 
export const insert: types.insert = async (texts) => {

    let language = await langs.getall();
    language.forEach((e) => {
        const matchingText = texts.some((t) => t.langName === e.name);
        if (!matchingText) {
            throw ErrorHandles.mssing_info
        }
    })

    const client = await Pool.connect();

    try {
        await client.query('BEGIN');
        const { rows } = await client.query<{ id: number }>(`INSERT INTO textkeys DEFAULT VALUES RETURNING id`);
        const keyId = rows[0].id;
        for (let i = 0; i < language.length; i++) {
            await client.query(
                'INSERT INTO translations (text, lang_id,textkey_id) VALUES ($1, $2,$3)',
                [texts[i].text, texts[i].langName, keyId]
            );
        }
        await client.query('COMMIT');
        return { id: keyId };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

export const getByLangName: types.getbylangname = async (langName) => {
    const { rows } = await Pool.query<{ id: number, langName: string, contextId: number, text: string }>(`SELECT t.textkey_id as contextId, l.name as langName, t.text
    FROM translation t
    left JOIN textkeys tk ON t.textkey_id = tk.id
    left JOIN langs l ON t.lang_id = l.id
    WHERE l.name = $1`, [langName]);
    return rows
}

export const getByKeyId: types.getByKeyId = async (keyId) => {
    const { rows } = await Pool.query<{ id: number, langName: string, contextId: number, text: string }>(`SELECT t.textkey_id as contextId, l.name as langName, t.text
    FROM translation t
    left JOIN textkeys tk ON t.textkey_id = tk.id
    left JOIN langs l ON t.lang_id = l.id
    WHERE t.textkey_id = $1`, [keyId]);
    return rows
}
export const getByBoth: types.getByBoth = async (keyId, langName) => {
    const { rows } = await Pool.query<{ id: number, langName: string, contextId: number, text: string }>(`SELECT t.textkey_id as contextId, l.name as langName, t.text
    FROM translation t
    left JOIN textkeys tk ON t.textkey_id = tk.id
    left JOIN langs l ON t.lang_id = l.id
    WHERE t.textkey_id = $1 and l.name = $2`, [keyId, langName]);
    return rows
}

export const deleteone: types.deleteone = async (keyTextId: number, langID: number) => {
    if (!keyTextId || !langID) {
        throw ErrorHandles.mssing_info;
    }
    const { rowCount } = await Pool.query(`DELETE FROM translation WHERE textkey_id = $1 and t.lang_id=$2`, [keyTextId, langID])

    if (rowCount == null) {
        return false;
    }
    else {
        return true;
    }
}
