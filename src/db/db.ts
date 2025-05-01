
import { Pool as pool } from 'pg';

const Pool = new pool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
    port: Number(process.env.DBPORT),

});

(async () => {
    await Pool.connect()
    console.log('Database connected successfully')
})();

export default Pool;