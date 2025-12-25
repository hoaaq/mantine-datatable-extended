import { createLoader, parseAsInteger, parseAsJson } from "nuqs/server";
import { z } from "zod";
import type { ExtendedDataTableProps } from "../types";
import {
  filterSchema,
  searchSchema,
  sortSchema,
} from "../types/data-table-query-params";
import { mergeQueryKey } from "../utils";

export * from "./data-table-skeleton";

export const createDataTableLoader = (props: ExtendedDataTableProps = {}) => {
  const { prefixQueryKey, defaultSorts } = props;
  const searchParams = {
    [mergeQueryKey("page", prefixQueryKey)]: parseAsInteger.withDefault(1),
    [mergeQueryKey("pageSize", prefixQueryKey)]: parseAsInteger.withDefault(10),
    [mergeQueryKey("sorts", prefixQueryKey)]: parseAsJson(
      z.array(sortSchema)
    ).withDefault(defaultSorts ?? []),
    [mergeQueryKey("search", prefixQueryKey)]: parseAsJson(
      searchSchema
    ).withDefault({
      accessors: [],
      value: "",
    }),
    [mergeQueryKey("filters", prefixQueryKey)]: parseAsJson(
      z.array(filterSchema)
    ).withDefault([]),
  };
  return createLoader(searchParams);
};
