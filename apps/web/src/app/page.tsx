import { Container, Space } from "@mantine/core";
import {
  createDataTableLoader,
  DataTableSkeleton,
} from "@repo/ui/data-table/server";
import type { ExtendedDataTableProps } from "@repo/ui/data-table/types";
import { extractOriginalQueryParams } from "@repo/ui/data-table/utils";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { SearchParams } from "nuqs";
import { Suspense } from "react";
import { getTasks } from "./(data-table)/data";
import { DataTable } from "./(data-table)/table";

const dataTableProps: ExtendedDataTableProps = {
  prefixQueryKey: "todo",
  defaultSorts: [{ accessor: "createdAt", direction: "desc" }],
};

const loader = createDataTableLoader();

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const loadedSearchParams = await loader(searchParams);
  const _ = dataTableProps.prefixQueryKey
    ? extractOriginalQueryParams(
        loadedSearchParams,
        dataTableProps.prefixQueryKey
      )
    : loadedSearchParams;

  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await getTasks();
      return {
        items: res?.items || [],
        totalRecords: res?.totalRecords || 0,
      };
    },
  });

  return (
    <Container size="xl">
      <Space h="xl" />
      <Suspense fallback={<DataTableSkeleton />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <DataTable />
        </HydrationBoundary>
      </Suspense>
    </Container>
  );
}
