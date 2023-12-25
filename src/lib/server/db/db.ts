import mysql from "mysql2/promise"
import {drizzle} from "drizzle-orm/mysql2";
import { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } from '$env/static/private';

export const pool = await mysql.createPool({
        host: DB_HOST,
        port: Number(DB_PORT),
        user: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
    }
)

export const db = drizzle(pool, {})