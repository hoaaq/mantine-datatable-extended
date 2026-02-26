import { parseAsInteger, parseAsJson, useQueryState } from "nuqs";
import z from "zod";
import { useDteContext } from "../provider";
import type { TDefaultParams, TUrlKeys } from "../types";
import {
  filterSchema,
  searchSchema,
  sortSchema,
} from "../types/data-table-query-param.type";

export function useDteQueryParams() {
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
  const { urlKeys, defaultParams } = useDteContext();
  if (urlKeys) {
    keys = urlKeys;
  }
  if (defaultParams) {
    params = { ...params, ...defaultParams };
  }

  const [page, setPage] = useQueryState(
    keys.page,
    parseAsInteger.withDefault(params.page)
  );
  const [pageSize, setPageSize] = useQueryState(
    keys.pageSize,
    parseAsInteger.withDefault(params.pageSize)
  );
  const [sorts, setSorts] = useQueryState(
    keys.sorts,
    parseAsJson(z.array(sortSchema)).withDefault(params.sorts)
  );
  const [search, setSearch] = useQueryState(
    keys.search,
    parseAsJson(searchSchema).withDefault(params.search)
  );
  const [filters, setFilters] = useQueryState(
    keys.filters,
    parseAsJson(z.array(filterSchema)).withDefault(params.filters)
  );

  const resetPage = () => {
    setPage(params.page);
  };
  const resetPageSize = () => {
    setPageSize(params.pageSize);
  };
  const resetSorts = () => {
    setSorts(params.sorts);
  };
  const resetSearch = () => {
    setSearch(params.search);
  };
  const resetFilters = () => {
    setFilters(params.filters);
  };
  const resetAll = () => {
    resetPage();
    resetPageSize();
    resetSorts();
    resetSearch();
    resetFilters();
  };

  return {
    page,
    setPage,
    pageSize,
    setPageSize,
    sorts,
    setSorts,
    search,
    setSearch,
    filters,
    setFilters,
    resetPage,
    resetPageSize,
    resetSorts,
    resetSearch,
    resetFilters,
    resetAll,
  };
}
