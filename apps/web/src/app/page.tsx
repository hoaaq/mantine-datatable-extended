import { Container, Group, Space } from "@mantine/core";
import {
  DataTableColumnsToggle,
  type DataTableContextProps,
  DataTableFilter,
  DataTablePagination,
  DataTableSearch,
  DataTableSortList,
} from "@repo/ui";
import { createDataTableLoader } from "@repo/ui/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs";
import { createLoader, parseAsInteger } from "nuqs/server";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { getQueryClient } from "@/components/providers/query-provider/create-client";
import { QueryTimeout } from "@/components/query-timeout";
import { client } from "@/lib/treaty";
import { DataTable } from "./(data-table)/table";
import { DataTableWrapper } from "./(data-table)/wrapper";

const loaderProps: Pick<DataTableContextProps, "urlKeys" | "defaultParams"> = {
  defaultParams: {
    sorts: [{ accessor: "createdAt", direction: "desc" }],
  },
};
const loader = createDataTableLoader(loaderProps);

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const loadTimeout = createLoader({
    st: parseAsInteger.withDefault(200),
  });
  const { st } = await loadTimeout(searchParams);

  const loadedSearchParams = await loader(searchParams);
  const { page, pageSize, sorts, search, filters } = loadedSearchParams;

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
    <Container size={1600}>
      <QueryTimeout />
      <Space h="xl" />
      <DataTableWrapper {...loaderProps} storeColumnsKey="todo">
        <DataTableHeader />
        <Space h="md" />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<DataTableSkeleton />}>
            <DataTable />
          </Suspense>
        </HydrationBoundary>
        <Space h="md" />
        <DataTableFooter />
      </DataTableWrapper>
    </Container>
  );
}

export function DataTableHeader() {
  return (
    <Group justify="space-between">
      <Group>
        <DataTableSearch />
        <DataTableFilter />
      </Group>
      <Group justify="end">
        <DataTableSortList />
        <DataTableColumnsToggle />
      </Group>
    </Group>
  );
}

export function DataTableFooter() {
  return <DataTablePagination />;
}
