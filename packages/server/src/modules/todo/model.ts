import { dbModel } from "@repo/db";
import type {
  FilterCondition,
  SearchCondition,
  SortCondition,
} from "@repo/db/find-many-query-builder";
import { t } from "elysia";

const { task: selectTask } = dbModel.select;

export const taskModel = {
  entity: t.Object({
    ...selectTask,
    incrementId: t.Number(),
    code: t.String(),
  }),
} as const;

// https://github.com/elysiajs/elysia/issues/1286
// Elysia issue with typebox transform

export const queryParamsElysiaModel = t.Object({
  sleep: t.Optional(t.Number()),
  page: t.Optional(t.Integer()),
  pageSize: t.Optional(t.Integer()),
  sorts: t.Optional(
    t
      .Transform(t.String())
      .Decode((value: string) => JSON.parse(value) as SortCondition[])
      .Encode((value: SortCondition[]) =>
        JSON.stringify(value)
      ) as unknown as ReturnType<typeof t.String>
  ),
  search: t.Optional(
    t
      .Transform(t.String())
      .Decode((value: string) => JSON.parse(value) as SearchCondition)
      .Encode((value: SearchCondition) =>
        JSON.stringify(value)
      ) as unknown as ReturnType<typeof t.String>
  ),
  filters: t.Optional(
    t
      .Transform(t.String())
      .Decode((value: string) => JSON.parse(value) as FilterCondition[])
      .Encode((value: FilterCondition[]) =>
        JSON.stringify(value)
      ) as unknown as ReturnType<typeof t.String>
  ),
});

export type StaticQueryParamsType = Omit<
  typeof queryParamsElysiaModel.static,
  "sorts" | "search" | "filters"
> & {
  sorts: SortCondition[];
  search: SearchCondition;
  filters: FilterCondition[];
};
