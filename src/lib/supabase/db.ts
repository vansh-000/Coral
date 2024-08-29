import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "../../../migrations/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";
dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  console.log("🔴 No DATABASE_URL");
  process.exit(1);
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(client, { schema });
const migrateDb = async () => {
  try {
    console.log("Migration client");
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("🟢 Sucessfully Migrated");
  } catch (error) {
    console.log("🔴 Error migrating database");
  }
};
migrateDb();
export default db;
