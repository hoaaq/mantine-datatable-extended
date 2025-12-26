import { table } from "./schema";
import { spreads } from "./spread-db";

export const dbModel = {
  select: spreads(
    {
      task: table.task,
    },
    "select"
  ),
} as const;
