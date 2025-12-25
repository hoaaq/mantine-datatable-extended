import { useDataTableColumns } from "mantine-datatable";
import type { ExtendedDataTableColumnProps } from "../types";

type OriginalDataTableColumn<T = Record<string, unknown>> = Parameters<
  typeof useDataTableColumns<T>
>[0];

type TUseDataTableColumnsExtendProps<T = Record<string, unknown>> = Omit<
  OriginalDataTableColumn<T>,
  "columns"
> & {
  columns: ExtendedDataTableColumnProps<T>[];
};

export function useDataTableColumnsExtend<T = Record<string, unknown>>({
  key,
  columns,
  getInitialValueInEffect = true,
  headerRef,
  scrollViewportRef,
  onFixedLayoutChange,
}: TUseDataTableColumnsExtendProps<T>) {
  const originalResult = useDataTableColumns<T>({
    key,
    columns,
    getInitialValueInEffect,
    headerRef,
    scrollViewportRef,
    onFixedLayoutChange,
  });

  return {
    ...originalResult,
    effectiveColumns:
      originalResult.effectiveColumns as ExtendedDataTableColumnProps<T>[],
  };
}
