import { createLoader, parseAsInteger, parseAsJson } from "nuqs/server";
import { z } from "zod";
import {
  filterSchema,
  searchSchema,
  sortSchema,
  type TDefaultParams,
  type TDteContextProps,
  type TUrlKeys,
} from "../types";

export type TCreateDteLoaderProps = Pick<
  TDteContextProps,
  "urlKeys" | "defaultParams"
>;

export function createDteLoader(props: TCreateDteLoaderProps = {}) {
  let keys: TUrlKeys = {
    page: "page",
    pageSize: "pageSize",
    sorts: "sorts",
    search: "search",
    filters: "filters",
  };
  let params: Required<TDefaultParams> = {
    page: 1,
    pageSize: 10,
    sorts: [],
    search: { accessors: [], value: "" },
    filters: [],
  };
  const { urlKeys, defaultParams } = props;
  if (urlKeys) {
    keys = urlKeys;
  }
  if (defaultParams) {
    params = { ...params, ...defaultParams };
  }
  const searchParams = {
    [`${keys.page}`]: parseAsInteger.withDefault(params.page),
    [`${keys.pageSize}`]: parseAsInteger.withDefault(params.pageSize),
    [`${keys.sorts}`]: parseAsJson(z.array(sortSchema)).withDefault(
      params.sorts
    ),
    [`${keys.search}`]: parseAsJson(searchSchema).withDefault(params.search),
    [`${keys.filters}`]: parseAsJson(z.array(filterSchema)).withDefault(
      params.filters
    ),
  };
  return createLoader(searchParams);
}
