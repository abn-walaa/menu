import Pool from "@Pool";
import * as types from "@InnerTypes/translation";
import ErrorHandles from "@InnerTypes/error/error";
import * as langs from "@modules/langs";


export const insert: types.insert = async (texts, client) => {


    let language = await langs.getall();
    let lang_id: number[] = []
    language.forEach((e) => {
        const matchingText = texts.some((t) => t.lang_id === e.id, lang_id.push(e.id));
        console.log(matchingText)
        if (!matchingText) {
            throw new Error(ErrorHandles.mssing_info);
        }
    })

    const { rows } = await client.query<{ id: number }>(`INSERT INTO textkeys DEFAULT VALUES RETURNING id`);
    const keyId = rows[0].id;
    for (let i = 0; i < language.length; i++) {
        await client.query(
            'INSERT INTO translation (text,lang_id,textkey_id) VALUES ($1,$2,$3)',
            [texts[i].text, lang_id[i], keyId]
        );
    }
    return { id: keyId };
}


export const insert2: types.insert2 = async (texts, client) => {


    let language = await langs.getall();

    let lang_id: number[] = [];
    if (texts.length < language.length || texts.length > language.length) throw new Error(ErrorHandles.mssing_info);

    texts.forEach((e) => {
        const matchingText = language.some((l, index) => {
            if (e.lang_id === l.id) {
                language[index].id = -1;
                return true;
            }
        });
        if (!matchingText) {
            throw new Error(ErrorHandles.from_is_wrong);
        }
    })

    const { rows } = await client.query<{ id: number }>(`INSERT INTO textkeys DEFAULT VALUES RETURNING id`);
    const keyId = rows[0].id;
    const query = [];
    const values = [];
    for (let i = 0; i < language.length; i++) {
        values.push(texts[i].text, texts[i].lang_id, keyId)
        query.push(`($${values.length - 2},$${values.length - 1},$${values.length})`)
    }

    await client.query(
        'INSERT INTO translation (text,lang_id,textkey_id) VALUES ' + query.join(","),
        values
    );
    return { id: keyId };
}

export const getByLangName: types.getbylangname = async (langName) => {
    if (langName) {
        throw new Error(ErrorHandles.mssing_info);
    }
    const { rows } = await Pool.query<{ id: number, langName: string, contextId: number, text: string }>(`SELECT t.textkey_id as contextId, l.name as langName, t.text
    FROM translation t
    inner JOIN textkeys tk ON t.textkey_id = tk.id
    inner JOIN langs l ON t.lang_id = l.id
    WHERE l.name = $1`, [langName]);
    return rows
}

export const getByKeyId: types.getByKeyId = async (keyId) => {
    if (!keyId) {
        throw new Error(ErrorHandles.mssing_info);
    }
    const { rows } = await Pool.query<{ id: number, langName: string, contextId: number, text: string }>(`SELECT t.textkey_id as contextId, l.name as langName, t.text
    FROM translation t
    inner JOIN textkeys tk ON t.textkey_id = tk.id
    inner JOIN langs l ON t.lang_id = l.id
    WHERE t.textkey_id = $1`, [keyId]);
    return rows
}
export const getByBoth: types.getByBoth = async (keyId, langName) => {
    if (!keyId || langName) {
        throw new Error(ErrorHandles.mssing_info);
    }
    const { rows } = await Pool.query<{ id: number, langName: string, contextId: number, text: string }>(`SELECT t.textkey_id as contextId, l.name as langName, t.text
    FROM translation t
    inner JOIN textkeys tk ON t.textkey_id = tk.id
    inner JOIN langs l ON t.lang_id = l.id
    WHERE t.textkey_id = $1 and l.name = $2`, [keyId, langName]);
    return rows
}

export const deleteone: types.deleteone = async (keyTextId: number) => {
    if (!keyTextId) {
        throw new Error(ErrorHandles.mssing_info);
    }
    const { rowCount } = await Pool.query(`DELETE FROM keystext WHERE id = $1`, [keyTextId])

    if (rowCount == null) {
        return false;
    }
    else {
        return true;
    }
}
