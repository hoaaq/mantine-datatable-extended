import { parseAsInteger, parseAsJson, useQueryState } from "nuqs";
import z from "zod";
import type { ExtendedDataTableProps } from "../types";
import {
  filterSchema,
  searchSchema,
  sortSchema,
} from "../types/data-table-query-params";
import { mergeQueryKey } from "../utils";

export function useDataTableQueryParams(props: ExtendedDataTableProps = {}) {
  const { prefixQueryKey, defaultSorts } = props;
  const [page, setPage] = useQueryState(
    mergeQueryKey("page", prefixQueryKey),
    parseAsInteger.withDefault(1)
  );
  const [pageSize, setPageSize] = useQueryState(
    mergeQueryKey("pageSize", prefixQueryKey),
    parseAsInteger.withDefault(10)
  );
  const [sorts, setSorts] = useQueryState(
    mergeQueryKey("sorts", prefixQueryKey),
    parseAsJson(z.array(sortSchema)).withDefault(defaultSorts ?? [])
  );
  const [search, setSearch] = useQueryState(
    mergeQueryKey("search", prefixQueryKey),
    parseAsJson(searchSchema).withDefault({
      accessors: [],
      value: "",
    })
  );
  const [filters, setFilters] = useQueryState(
    mergeQueryKey("filters", prefixQueryKey),
    parseAsJson(z.array(filterSchema)).withDefault([])
  );

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
  };
}
