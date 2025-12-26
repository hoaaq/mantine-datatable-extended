import { Container, Space } from "@mantine/core";
import type { ExtendedDataTableProps } from "@repo/ui";
import {
  createDataTableLoader,
  extractOriginalQueryParams,
} from "@repo/ui/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs";
import { createLoader, parseAsInteger } from "nuqs/server";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { getQueryClient } from "@/components/providers/query-provider/create-client";
import { QueryTimeout } from "@/components/query-timeout";
import { client } from "@/lib/treaty";
import { DataTable, DataTableExtended } from "./(data-table)/table";

const dataTableProps: ExtendedDataTableProps = {
  prefixQueryKey: "todo",
  defaultSorts: [{ accessor: "createdAt", direction: "desc" }],
};

const loader = createDataTableLoader(dataTableProps);

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const loadedSearchParams = await loader(searchParams);
  const { page, pageSize, sorts, search, filters } =
    dataTableProps.prefixQueryKey
      ? extractOriginalQueryParams(
          loadedSearchParams,
          dataTableProps.prefixQueryKey
        )
      : loadedSearchParams;

  const loadTimeout = createLoader({
    st: parseAsInteger.withDefault(200),
  });
  const { st } = await loadTimeout(searchParams);

  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["tasks", page, pageSize, sorts, search, filters],
    queryFn: async () => {
      const { data: res } = await client.api.todo.task.get({
        query: {
          sleep: st,
          page: page as number,
          pageSize: pageSize as number,
          sorts: JSON.stringify(sorts),
          search: JSON.stringify(search),
          filters: JSON.stringify(filters),
        },
      });
      return {
        items: res?.data?.items || [],
        totalRecords: res?.data?.totalRecords || 0,
      };
    },
  });

  return (
    <Container size="xl">
      <QueryTimeout />
      <Space h="xl" />
      <DataTableExtended {...dataTableProps} />
      <Space h="md" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<DataTableSkeleton />}>
          <DataTable {...dataTableProps} />
        </Suspense>
      </HydrationBoundary>
    </Container>
  );
}
