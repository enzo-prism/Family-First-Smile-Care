import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle, type NeonDatabase } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn(
    "DATABASE_URL not set. Falling back to in-memory storage for development.",
  );
}

export const pool = connectionString
  ? new Pool({ connectionString })
  : undefined;

export const db: NeonDatabase<typeof schema> | undefined = connectionString
  ? drizzle({ client: pool!, schema })
  : undefined;

export const hasDatabase = Boolean(db);
