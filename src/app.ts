import express, { Express } from "express";
import cors from "cors";
import router from "./routes";
import { connectDb, disconnectDB, loadEnv } from "./config";

loadEnv();

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
}

export async function close(): Promise<void> {
    await disconnectDB();
}

export default app;
