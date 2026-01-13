import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export const db = drizzle(process.env.DATABASE_URL || "", { schema });

export * as findManyQueryBuilder from "./find-many-query-builder";
export { dbModel } from "./model";
export * from "./schema";
