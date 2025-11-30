// src/server/db.ts   (or wherever your database connection lives)

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@shared/schema";

// This works perfectly with pgAdmin 4 default settings
const connectionString =
  "postgres://postgres:1234@localhost:5432/fintechfortress";

const client = postgres(connectionString, {
  host: "localhost",
  port: 5432,
  database: "fintechfortress",
  username: "postgres",
  password: "1234", // change only if you set a different password
  max: 10,
  onnotice: () => {}, // removes noisy notices in console
});

export const db = drizzle(client, { schema });

// Optional: clean shutdown
process.on("SIGINT", async () => {
  await client.end();
  process.exit(0);
});