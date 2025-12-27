"use client";

import { Group } from "@mantine/core";
import {
  DataTableColumnsToggle,
  DataTableFilter,
  DataTablePagination,
  DataTableSearch,
  DataTableSortList,
  useDataTableContext,
} from "@repo/ui";
import { DataTable as MantineDataTable } from "mantine-datatable";
import { useEffect } from "react";
import { useData } from "./data";

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
  const {
    storeColumnsKey,
    originalUseDataTableColumnsResult,
    setPaginationProps,
  } = useDataTableContext();
  const { effectiveColumns } = originalUseDataTableColumnsResult;

  const PAGE_SIZES = [10, 20, 30, 40, 50];
  useEffect(() => {
    setPaginationProps?.({
      totalRecords,
      recordsPerPageOptions: PAGE_SIZES,
    });
  }, [totalRecords, setPaginationProps]);

  return (
    <MantineDataTable
      columns={effectiveColumns}
      fetching={isFetching}
      height={437}
      records={paginatedRecords}
      storeColumnsKey={storeColumnsKey}
      withColumnBorders
      withRowBorders
      withTableBorder
    />
  );
}

export function DataTableFooter() {
  return <DataTablePagination />;
}
