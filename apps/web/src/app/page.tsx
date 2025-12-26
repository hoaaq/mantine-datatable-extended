import { Container, Space } from "@mantine/core";
import {
  type ExtendedDataTableProps,
  extractOriginalQueryParams,
  type TFilterCondition,
  type TSearchCondition,
  type TSortCondition,
} from "@repo/ui";
import { createDataTableLoader } from "@repo/ui/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { SearchParams } from "nuqs";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { client } from "@/lib/treaty";
import { DataTable, DataTableExtended } from "./(data-table)/table";

const dataTableProps: ExtendedDataTableProps = {
  prefixQueryKey: undefined,
  defaultSorts: [{ accessor: "createdAt", direction: "desc" }],
};

const loader = createDataTableLoader();

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

  const _sorts =
    Array.isArray(sorts) && sorts.length > 0
      ? (sorts as TSortCondition[])
      : dataTableProps.defaultSorts;

  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["tasks", page, pageSize, _sorts, search, filters],
    queryFn: async () => {
      const { data: res } = await client.api.todo.task.get({
        query: {
          page: page as number,
          pageSize: pageSize as number,
          sorts: JSON.stringify(_sorts) as unknown as TSortCondition[],
          search: JSON.stringify(search) as unknown as TSearchCondition,
          filters: JSON.stringify(filters) as unknown as TFilterCondition[],
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
      <Space h="xl" />
      <DataTableExtended {...dataTableProps} />
      <Space h="md" />
      <Suspense fallback={<DataTableSkeleton />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <DataTable {...dataTableProps} />
        </HydrationBoundary>
      </Suspense>
    </Container>
  );
}
