import { sql } from "drizzle-orm";
import { integer, pgSchema, text, timestamp } from "drizzle-orm/pg-core";

export const todoSchema = pgSchema("todo");

export const task = todoSchema.table("task", {
  id: text("id").primaryKey(),
  incrementId: integer("increment_id").notNull().generatedAlwaysAsIdentity(),
  code: text("code")
    .notNull()
    .generatedAlwaysAs(sql`'TAS' || lpad(increment_id::text, 8, '0')`),

  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull(),
  priority: integer("priority").notNull(),
  estimatedHours: integer("estimated_hours").notNull(),
  dueDate: timestamp("due_date"),
  tags: text("tags").array(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});
