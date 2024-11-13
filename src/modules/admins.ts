import Pool from "@Pool";
import * as ErrorHandles from "@InnerTypes/error/error"
import * as  types from "@InnerTypes/admins/module";
import validator = require("validator");


export const insertOne: types.insertOne = async (name, password, email) => {
    if (!name.trim() || !password.trim() || password.length < 8 || !validator.isEmail(email))
        throw new Error(ErrorHandles.errorMessage.mssing_info)
    const newPassword = await Bun.password.hash(password);

    const { rows } = await Pool.query<{ id: number }>(`
        insert into admins(name,password,email) values($1,$2,$3) returning id 
        `, [name, newPassword, email])
    return { name, email, id: rows[0].id };
}


// export const genToken: types.genToken = async (user_id,ip,user_agent,)=>{

// }