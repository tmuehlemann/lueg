import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_PASSWORD, DB_USERNAME, DB_DATABASE, DB_PORT } = process.env;

// todo: can be empty string, check if null or undefined

export default {
  schema: "./src/lib/server/db/schema.ts",
  out: "./src/lib/server/db/migrations",
  driver: "mysql2",
  dbCredentials: {
    host: DB_HOST,
    port: Number(DB_PORT) || 3306,
    user: DB_USERNAME,
    database: DB_DATABASE,
    password: DB_PASSWORD,
  },
} satisfies Config;
