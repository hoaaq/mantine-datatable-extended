import { useSuspenseQuery } from "@tanstack/react-query";
import { client } from "@/lib/treaty";

const KEY = "basic-demo";

export function useData() {
  const { data, isFetching } = useSuspenseQuery({
    queryKey: [KEY],
    queryFn: async () => {
      const { data: res } = await client.api.todo.task.get();
      return {
        items: res?.data.items || [],
        totalRecords: res?.data.totalRecords || 0,
      };
    },
  });

  return {
    records: data?.items || [],
    totalRecords: data?.totalRecords || 0,
    isFetching,
  };
}
