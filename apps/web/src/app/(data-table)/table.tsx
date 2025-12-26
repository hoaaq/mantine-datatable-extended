"use client";

import { Group } from "@mantine/core";
import {
  DataTableColumnsToggle,
  DataTableFilter,
  DataTableSearch,
  DataTableSortList,
  type ExtendedDataTableProps,
  useDataTableQueryParams,
} from "@repo/ui";
import { DataTable as MantineDataTable } from "mantine-datatable";
import { useColumns } from "./columns";
import { useData } from "./data";

const PAGE_SIZES = [10, 20, 30, 40, 50];

export function DataTableExtended(props: ExtendedDataTableProps = {}) {
  const { prefixQueryKey, defaultSorts } = props;
  const { columnStoreKey, effectiveColumns } = useColumns();

  return (
    <Group justify="space-between">
      <Group>
        <DataTableSearch
          columns={effectiveColumns}
          prefixQueryKey={prefixQueryKey}
        />
        <DataTableFilter
          columns={effectiveColumns}
          facets={[
            {
              accessor: "status",
              data: [
                { label: "Pending", value: "pending" },
                { label: "Completed", value: "completed" },
                { label: "In Progress", value: "in_progress" },
              ],
            },
          ]}
          prefixQueryKey={prefixQueryKey}
        />
      </Group>
      <Group justify="end">
        <DataTableSortList
          columns={effectiveColumns}
          defaultSorts={defaultSorts}
          prefixQueryKey={prefixQueryKey}
        />
        <DataTableColumnsToggle
          columnStoreKey={columnStoreKey}
          columns={effectiveColumns}
        />
      </Group>
    </Group>
  );
}

export function DataTable(props: ExtendedDataTableProps = {}) {
  const { paginatedRecords, totalRecords, isFetching } = useData(props);
  const { columnStoreKey, effectiveColumns } = useColumns();
  const { page, pageSize, setPage, setPageSize } =
    useDataTableQueryParams(props);

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
      storeColumnsKey={columnStoreKey}
      totalRecords={totalRecords}
      withColumnBorders
      withRowBorders
      withTableBorder
    />
  );
}
