import type {
  ExtendedDataTableProps,
  TFilterCondition,
  TSearchCondition,
  TSortCondition,
} from "@repo/ui";
import { cleanSearch, useDataTableQueryParams } from "@repo/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { client } from "@/lib/treaty";

export function useData(props: ExtendedDataTableProps = {}) {
  const { page, pageSize, sorts, search, filters } =
    useDataTableQueryParams(props);

  const cleanedSearch = cleanSearch(search);

  const { data, isFetching } = useSuspenseQuery({
    queryKey: ["tasks", page, pageSize, sorts, cleanedSearch, filters],
    queryFn: async () => {
      const { data: res } = await client.api.todo.task.get({
        query: {
          page,
          pageSize,
          sorts: JSON.stringify(sorts) as unknown as TSortCondition[],
          search: JSON.stringify(cleanedSearch) as unknown as TSearchCondition,
          filters: JSON.stringify(filters) as unknown as TFilterCondition[],
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
