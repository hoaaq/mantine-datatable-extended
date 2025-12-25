import { drizzle } from "drizzle-orm/node-postgres";

// biome-ignore lint/performance/noNamespaceImport: no reason
import * as schema from "./schema";

export const db = drizzle(process.env.DATABASE_URL || "", { schema });
