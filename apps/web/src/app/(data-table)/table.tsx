"use client";

import { Group } from "@mantine/core";
import {
  DataTableColumnsToggle,
  DataTableFilter,
  DataTableSearch,
  DataTableSortList,
  useDataTableContext,
  useDataTableQueryParams,
} from "@repo/ui";
import { DataTable as MantineDataTable } from "mantine-datatable";
import { useData } from "./data";

const PAGE_SIZES = [10, 20, 30, 40, 50];

export function DataTableExtended() {
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

export function DataTable() {
  const { paginatedRecords, totalRecords, isFetching } = useData();
  const { page, pageSize, setPage, setPageSize } = useDataTableQueryParams();
  const { storeColumnsKey, originalUseDataTableColumnsResult } =
    useDataTableContext();
  const { effectiveColumns } = originalUseDataTableColumnsResult;

  return (
    <MantineDataTable
      columns={effectiveColumns}
      fetching={isFetching}
      height={484}
      onPageChange={setPage}
      onRecordsPerPageChange={setPageSize}
      page={page}
      records={paginatedRecords}
      recordsPerPage={pageSize}
      recordsPerPageOptions={PAGE_SIZES}
      storeColumnsKey={storeColumnsKey}
      totalRecords={totalRecords}
      withColumnBorders
      withRowBorders
      withTableBorder
    />
  );
}
