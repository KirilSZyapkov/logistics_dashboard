import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "../../drizzle/schema";

console.log("DB URL:", process.env.DATABASE_URL);

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql,{schema});

export default db;