import { useDebouncedValue } from "@mantine/hooks";
import { useDataTableQueryParams } from "@repo/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import { client } from "@/lib/treaty";

const KEY = "full-demo";

type SearchCondition = ReturnType<typeof useDataTableQueryParams>["search"];

const cleanSearch = (search: SearchCondition): SearchCondition => {
  if (search.accessors.length <= 0 || search.value.length <= 0) {
    return {
      accessors: [],
      value: "",
    };
  }
  return search;
};

export function useData() {
  const { page, pageSize, sorts, search, filters } = useDataTableQueryParams();
  const [[debouncedPage, debouncedPageSize]] = useDebouncedValue(
    [page, pageSize],
    200,
    {
      leading: false,
    }
  );
  const [[debouncedSorts, debouncedSearch, debouncedFilters]] =
    useDebouncedValue([sorts, search, filters], 500, {
      leading: false,
    });
  const cleanedSearch = cleanSearch(debouncedSearch as SearchCondition);

  const [clientTimeout] = useQueryState("ct", parseAsInteger.withDefault(600));

  const { data, isFetching } = useSuspenseQuery({
    queryKey: [
      KEY,
      debouncedPage,
      debouncedPageSize,
      debouncedSorts,
      cleanedSearch,
      debouncedFilters,
    ],
    queryFn: async () => {
      const { data: res } = await client.api.todo.task.get({
        query: {
          sleep: clientTimeout,
          page: debouncedPage,
          pageSize: debouncedPageSize,
          sorts: JSON.stringify(debouncedSorts),
          search: JSON.stringify(cleanedSearch),
          filters: JSON.stringify(debouncedFilters),
        },
      });
      return {
        items: res?.data.items || [],
        totalRecords: res?.data.totalRecords || 0,
      };
    },
  });

  return {
    paginatedRecords: data?.items || [],
    totalRecords: data?.totalRecords || 0,
    isFetching,
  };
}

export function useFacets() {
  const { data, isFetching } = useSuspenseQuery({
    queryKey: [KEY, "tags-facet"],
    queryFn: async () => {
      const { data: res } = await client.api.todo.facet.tags.get();
      return { items: res?.data.items || [] };
    },
  });
  return { tagsFacet: data?.items || [], isFetching };
}
