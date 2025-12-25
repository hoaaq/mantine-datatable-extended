import { useDataTableQueryParams } from "@repo/ui/data-table/hooks";
import type { ExtendedDataTableProps } from "@repo/ui/data-table/types";
import { cleanSearch } from "@repo/ui/data-table/utils";
import { useQuery } from "@tanstack/react-query";
import { tasks } from "@/asset/data";
import type { Task } from "@/asset/types";

// Mockup API
const getTasks = (
  _props: ExtendedDataTableProps = {}
): Promise<{
  items: Task[];
  totalRecords: number;
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        items: tasks,
        totalRecords: tasks.length,
      });
    }, 1000);
  });
};

export function useData(props: ExtendedDataTableProps = {}) {
  const { page, pageSize, sorts, search, filters } =
    useDataTableQueryParams(props);

  const cleanedSearch = cleanSearch(search);

  const { data, isFetching } = useQuery({
    queryKey: ["tasks", page, pageSize, sorts, cleanedSearch, filters],
    queryFn: async () => {
      const res = await getTasks(props);
      return {
        items: res?.items || [],
        totalRecords: res?.totalRecords || 0,
      };
    },
  });
  const records = data?.items || [];
  const totalRecords = data?.totalRecords || 0;

  return {
    paginatedRecords: records,
    totalRecords,
    isFetching,
  };
}
