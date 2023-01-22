import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const configDatabase = {
    connectionString: process.env.DATABASE_URL,
    ssl: false,
};

if (process.env.MODE === "prod") configDatabase.ssl = true;

const connection = new pg.Pool(configDatabase);

export default connection;
