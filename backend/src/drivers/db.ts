import knex from "knex";
import dotenv from "dotenv";
import { Pool } from "pg";

// Load environment variables
dotenv.config();

// Create knex instance
export const knexInstance = knex({
  client: "pg",
  connection: {
    host: process.env.POSTGRES_DB_HOST || "localhost",
    port: parseInt(process.env.POSTGRES_DB_PORT || "5432"),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
  },
  pool: {
    min: 2,
    max: 10,
  },
});
