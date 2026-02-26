import { db, table } from "@repo/db";
import { createQueryBuilder } from "@repo/db/find-many-query-builder";
import { count, sql } from "drizzle-orm";
import type { StaticQueryParamsType, taskModel } from "./model";

export abstract class TodoService {
  static async getManyTasks({
    query,
  }: {
    query: StaticQueryParamsType;
  }): Promise<{
    items: (typeof taskModel.entity.static)[];
    totalRecords: number;
  }> {
    // Count query (with filters applied)
    const countQuery = db
      .select({ count: count() })
      .from(table.task)
      .$dynamic();

    // Base query with dynamic filters
    const baseQuery = db.select().from(table.task).$dynamic();

    // Apply query params using query builder (type-safe)
    const finalQuery = createQueryBuilder(baseQuery, table.task)
      .applyParams(query)
      .build();
    const finalCountQuery = createQueryBuilder(countQuery, table.task)
      .applyParams(query, true)
      .build();

    const [total, tasks] = await Promise.all([finalCountQuery, finalQuery]);

    return {
      items: tasks,
      totalRecords: total[0]?.count || 0,
    };
  }

  static async getFacetTags(): Promise<{
    items: (typeof taskModel.facet.static)[];
  }> {
    const tags = await db.execute<{ value: string; count: string }>(sql`
      SELECT value::text as value, COUNT(*)::text as count
      FROM ${table.task}, unnest(COALESCE(${table.task.tags}, ARRAY[]::text[])) as value
      WHERE value != ''
      GROUP BY value
      ORDER BY count DESC
    `);
    return {
      items: tags.rows.map((tag) => ({
        value: String(tag.value ?? ""),
        count: Number(tag.count ?? 0),
      })),
    };
  }
}
