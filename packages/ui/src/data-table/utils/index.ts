import type {
  TFilterCondition,
  TSearchCondition,
  TSortCondition,
} from "../types";

export const mergeQueryKey = (queryKey: string, prefixQueryKey?: string) => {
  if (prefixQueryKey) {
    return `${prefixQueryKey}_${queryKey}`;
  }
  return queryKey;
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
