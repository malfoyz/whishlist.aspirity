import dotenv from 'dotenv'
import pg from "pg"
const { Pool } = pg

dotenv.config()

const pool = new Pool({
    user: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASS,
    host: process.env.POSTGRES_DB_HOST,
    port: process.env.POSTGRES_DB_PORT,
    database: "wishlist",
})



export default pool