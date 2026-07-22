import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle, type NeonDatabase } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  if (process.env.NODE_ENV === "production") {
    console.error(
      "[db] CRITICAL: DATABASE_URL is not set in production. Contact form " +
        "submissions will be stored in ephemeral in-memory storage and LOST on " +
        "restart. Set DATABASE_URL to persist leads.",
    );
  } else {
    console.warn(
      "DATABASE_URL not set. Falling back to in-memory storage for development.",
    );
  }
}

export const pool = connectionString
  ? new Pool({ connectionString })
  : undefined;

export const db: NeonDatabase<typeof schema> | undefined = connectionString
  ? drizzle({ client: pool!, schema })
  : undefined;

export const hasDatabase = Boolean(db);
