import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const configDatabase = {
    connectionString: process.env.DATABASE_URL,
    ssl: false,
};

if (process.env.MODE === "prod") configDatabase.ssl = true;

export const connection = new pg.Pool(configDatabase);
