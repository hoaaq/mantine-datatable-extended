import {
  DataTable,
  type DataTablePaginationProps,
  type DataTableProps,
  type DataTableSortProps,
} from "mantine-datatable";
import { useDataTableContext } from "../provider";

type TDataTableExtendedProps<T = Record<string, unknown>> = Omit<
  DataTableProps<T>,
  | "storeColumnsKey"
  | "groups"
  | "columns"
  | keyof DataTablePaginationProps
  | keyof DataTableSortProps
>;

export function DataTableExtended<T = Record<string, unknown>>(
  props: TDataTableExtendedProps<T>
) {
  const { storeColumnsKey, originalUseDataTableColumnsResult } =
    useDataTableContext<T>();
  const { effectiveColumns } = originalUseDataTableColumnsResult;

  const extendedProps = {
    ...props,
    columns: effectiveColumns,
    storeColumnsKey,
  } as DataTableProps<T>;

  return <DataTable<T> {...extendedProps} />;
}
