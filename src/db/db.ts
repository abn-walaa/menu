
import { Pool as pool } from 'pg';

const Pool = new pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'menu',
    port: 5432,
    ssl: false,
    
});

(async () => {
    await Pool.connect()
    console.log('Database connected successfully')
})();

export default Pool;