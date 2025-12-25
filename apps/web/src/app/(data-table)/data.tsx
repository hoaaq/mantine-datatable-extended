import { useDataTableQueryParams } from "@repo/ui/data-table/hooks";
import type { ExtendedDataTableProps } from "@repo/ui/data-table/types";
import { cleanSearch } from "@repo/ui/data-table/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { tasks } from "@/asset/data";
import type { Task } from "@/asset/types";

// Mockup API
export const getTasks = (): Promise<{
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
  const { search } = useDataTableQueryParams(props);

  const _cleanedSearch = cleanSearch(search);

  const { data, isFetching } = useSuspenseQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await getTasks();
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
