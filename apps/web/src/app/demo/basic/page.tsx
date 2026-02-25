import { Container, Space } from "@mantine/core";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { DemoPageHeader } from "@/components/demo-page-header";
import { getQueryClient } from "@/components/providers/query-provider/create-client";
import { client } from "@/lib/treaty";
import { DataTableBody } from "./(data-table)/table";
import { DataTableWrapper } from "./(data-table)/wrapper";

const KEY = "basic-demo";

export default async function BasicDemoPage() {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: [KEY],
    queryFn: async () => {
      const { data: res } = await client.api.todo.task.get();
      return {
        items: res?.data?.items || [],
        totalRecords: res?.data?.totalRecords || 0,
      };
    },
  });

  return (
    <Container py="xl" size={1440}>
      <DemoPageHeader
        description="Basic demo directory structure"
        sourcePath="basic"
        title="Basic Demo"
      />
      <Space h="xl" />
      <DataTableWrapper storeColumnsKey={KEY}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<DataTableSkeleton />}>
            <DataTableBody />
          </Suspense>
        </HydrationBoundary>
      </DataTableWrapper>
    </Container>
  );
}
