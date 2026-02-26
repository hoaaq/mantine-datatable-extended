import { Container, Group, Space } from "@mantine/core";
import {
  DteColumnsToggle,
  DteFilter,
  DtePagination,
  DteSearch,
  DteSortList,
} from "@repo/ui";
import { createDteLoader, type TCreateDteLoaderProps } from "@repo/ui/server";
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

const KEY = "full-demo";

const loaderProps: Partial<TCreateDteLoaderProps> = {
  defaultParams: {
    sorts: [{ accessor: "createdAt", direction: "desc" }],
  },
};
const loader = createDteLoader(loaderProps);

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
    queryKey: [KEY, page, pageSize, sorts, search, filters],
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
  queryClient.prefetchQuery({
    queryKey: [KEY, "tags-facet"],
    queryFn: async () => {
      const { data: res } = await client.api.todo.facet.tags.get();
      return { items: res?.data.items || [] };
    },
  });

  return (
    <Container py="xl" size={1440}>
      <QueryTimeout />
      <Space h="xl" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DataTableWrapper {...loaderProps} storeColumnsKey={KEY}>
          <DataTableHeader />
          <Space h="md" />
          <Suspense fallback={<DataTableSkeleton />}>
            <DataTable />
          </Suspense>
          <Space h="md" />
          <DataTableFooter />
        </DataTableWrapper>
      </HydrationBoundary>
    </Container>
  );
}

export function DataTableHeader() {
  return (
    <Group justify="space-between">
      <Group>
        <DteSearch />
        <DteFilter />
      </Group>
      <Group justify="end">
        <DteSortList />
        <DteColumnsToggle />
      </Group>
    </Group>
  );
}

export function DataTableFooter() {
  return <DtePagination />;
}
