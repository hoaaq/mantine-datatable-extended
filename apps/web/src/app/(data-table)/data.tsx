import type { ExtendedDataTableProps } from "@repo/ui";
import { useDataTableQueryParams } from "@repo/ui";
import { cleanSearch } from "@repo/ui/server";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import { client } from "@/lib/treaty";

export function useData(props: ExtendedDataTableProps = {}) {
  const { page, pageSize, sorts, search, filters } =
    useDataTableQueryParams(props);
  const cleanedSearch = cleanSearch(search);

  const [clientTimeout] = useQueryState("ct", parseAsInteger.withDefault(1000));

  const { data, isFetching } = useSuspenseQuery({
    queryKey: ["tasks", page, pageSize, sorts, cleanedSearch, filters],
    queryFn: async () => {
      const { data: res } = await client.api.todo.task.get({
        query: {
          sleep: clientTimeout,
          page,
          pageSize,
          sorts: JSON.stringify(sorts),
          search: JSON.stringify(cleanedSearch),
          filters: JSON.stringify(filters),
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
