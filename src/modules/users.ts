import Pool from "@Pool";
import *as JWT from 'hono/jwt'
import * as  types from "@InnerTypes/users";
import validator = require("validator");
import ErrorHanlding from "@InnerTypes/error/error";


export const insertOne: types.insertOne = async (name, password, email, admin_id) => {
    if (!admin_id || !name.trim() || !password.trim() || password.length < 8 || !validator.isEmail(email))
        throw new Error(ErrorHanlding.mssing_info);

    if (!(await checkEmail(email))) {
        throw new Error(ErrorHanlding.email_used);
    }
    const newPassword = await Bun.password.hash(password);

    const { rows } = await Pool.query<{ id: number }>(`
        insert into users(name,password,email,admin_id) values($1,$2,$3,$4) returning id 
        `, [name, newPassword, email, admin_id])
    return { name, email, id: rows[0].id };
}


export const genToken: types.genToken = async (user_id) => {
    if (!user_id) throw new Error(ErrorHanlding.mssing_info);
    const token = await JWT.sign({
        exp: (Math.floor(Date.now() / 1000) + 60 * 60 * 24 * (process.env.JWT_EXPIRE ? Number(process.env.JWT_EXPIRE) : 30)),
        user_id
    }, process.env.JWT_KEY ?? "test")
    await Pool.query(`insert into users_tokens(token,admin_id) values($1,$2)`, [token, user_id])
    return token
}

export const checkUser: types.checkUser = async (email, password) => {
    if (!email.trim() || !password.trim) throw new Error(ErrorHanlding.mssing_info);
    const { rows } = await Pool.query<types.userLoginInfo>(`
        select id,password,email,name from users where email=$1
        `, [email])
    if (rows.length === 0) throw new Error(ErrorHanlding.email_not_found)
    if (!(await Bun.password.verify(password, rows[0].password)))
        throw new Error(ErrorHanlding.invalid_password)
    const user = rows[0];
    return { email: user.email, id: user.id, name: user.name }
}


export const findByToken: types.findByToken = async (user_id, token) => {
    if (!user_id || !token.trim()) throw new Error(ErrorHanlding.mssing_info);
    const { rows } = await Pool.query<types.userInfo>(`
        select a.id,a.email,a.name from  users_tokens adt 
        inner join users a on a.id=$1 and a.id=adt.admin_id
        where a.id=$1 and adt.token =$2
        `, [user_id, token])
    return rows[0];
}

export const getAll: types.getAll = async (next) => {

    const { rows } = await Pool.query<types.userInfo>(`
        select id,email,name from users 
        ${next !== undefined ? 'where id<$1' : ""}
        order by id desc
        `, next !== undefined ? [next] : [])
    return rows
}
async function checkEmail(email: string): Promise<boolean> {
    if (!email.trim()) throw new Error(ErrorHanlding.mssing_info);
    const { rows } = await Pool.query(
        `
        select id from users where email=$1
        `, [email])
    if (rows.length === 0) {
        return true
    }
    return false
}

