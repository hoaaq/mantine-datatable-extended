import {
  DataTable,
  type DataTablePaginationProps,
  type DataTableProps,
  type DataTableSortProps,
} from "mantine-datatable";
import { useDteContext } from "../provider";

type TDteExtendedProps<T = Record<string, unknown>> = Omit<
  DataTableProps<T>,
  | "storeColumnsKey"
  | "groups"
  | "columns"
  | keyof DataTablePaginationProps
  | keyof DataTableSortProps
>;

export function DteExtended<T = Record<string, unknown>>(
  props: TDteExtendedProps<T>
) {
  const { storeColumnsKey, originalUseDataTableColumnsResult } =
    useDteContext<T>();
  const { effectiveColumns } = originalUseDataTableColumnsResult;

  const extendedProps = {
    ...props,
    columns: effectiveColumns,
    storeColumnsKey,
  } as DataTableProps<T>;

  return <DataTable<T> {...extendedProps} />;
}
