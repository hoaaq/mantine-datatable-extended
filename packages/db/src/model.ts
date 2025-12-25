import { table } from "./schema";
import { spreads } from "./spread-db";

export const dbModel = {
  insert: spreads(
    {
      task: table.task,
    },
    "insert"
  ),
  select: spreads(
    {
      task: table.task,
    },
    "select"
  ),
} as const;
