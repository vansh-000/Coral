import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "../../../migrations/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";
dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  console.error("🔴 No DATABASE_URL found in the environment variables.");
  process.exit(1);
}

declare global {
  var _drizzleClient: ReturnType<typeof postgres> | undefined;
  var _migrationCompleted: boolean | undefined;
}

let client = global._drizzleClient;
if (!client) {
  client = postgres(process.env.DATABASE_URL as string, { max: 1 });
  global._drizzleClient = client; 
}

const db = drizzle(client, { schema });
const migrateDb = async () => {
  try {
    console.log("Running migrations...");
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("🟢 Migration completed successfully.");
  } catch (error) {
    console.error("🔴 Error migrating database:");
    console.error(error);
  }
};
if (!global._migrationCompleted) {
  migrateDb().finally(() => {
    global._migrationCompleted = true;  
  });
}

export default db; 
