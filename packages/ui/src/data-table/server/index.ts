import { createLoader, parseAsInteger, parseAsJson } from "nuqs/server";
import { z } from "zod";
import type {
  ExtendedDataTableProps,
  TFilterCondition,
  TSearchCondition,
  TSortCondition,
} from "../types";
import {
  filterSchema,
  searchSchema,
  sortSchema,
} from "../types/data-table-query-params";
import { mergeQueryKey } from "../utils";

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

export const cleanSearch = (search: TSearchCondition): TSearchCondition => {
  if (search.accessors.length <= 0 || search.value.length <= 0) {
    return {
      accessors: [],
      value: "",
    };
  }
  return search;
};

export const extractOriginalQueryParams = (
  searchParams: Record<string, unknown>,
  prefixQueryKey: string
) => {
  return {
    page: searchParams[mergeQueryKey("page", prefixQueryKey)] as number,
    pageSize: searchParams[mergeQueryKey("pageSize", prefixQueryKey)] as number,
    sorts: searchParams[
      mergeQueryKey("sorts", prefixQueryKey)
    ] as TSortCondition[],
    search: searchParams[
      mergeQueryKey("search", prefixQueryKey)
    ] as TSearchCondition,
    filters: searchParams[
      mergeQueryKey("filters", prefixQueryKey)
    ] as TFilterCondition[],
  };
};
