import { dbModel } from "@repo/db";
import { filterVariant } from "@repo/db/find-many-query-builder";
import { t } from "elysia";

const { task: insertTask } = dbModel.insert;
const { task: selectTask } = dbModel.select;

const { id: _, ...limitedInsertTask } = insertTask;

export const taskModel = {
  create: t.Object({
    ...limitedInsertTask,
    dueDate: t.Optional(
      t
        .Transform(t.String())
        .Decode((value: string) => new Date(value))
        .Encode((value: Date) => value.toISOString())
    ),
  }),
  entity: t.Object({
    ...selectTask,
    incrementId: t.Number(),
    code: t.String(),
  }),
} as const;

export const queryParamsElysiaModel = t.Object({
  page: t.Optional(t.Integer()),
  pageSize: t.Optional(t.Integer()),
  sorts: t.Optional(
    t.Array(
      t.Object({
        accessor: t.String(),
        direction: t.String(),
      })
    )
  ),
  search: t.Optional(
    t.Object({
      accessors: t.Array(t.String()),
      value: t.String(),
    })
  ),
  filters: t.Optional(
    t.Array(
      t.Object({
        accessor: t.String(),
        variant: t.Enum(filterVariant),
        value: t.Union([t.String(), t.Array(t.String())]),
      })
    )
  ),
});
