import type { DataTableColumn } from "mantine-datatable";
import type { EFilterVariant } from "../enums/data-table-query-param.enum";

export type ExtendedDataTableColumnProps<T = Record<string, unknown>> =
  DataTableColumn<T> & {
    extend?: {
      searchable?: boolean;
      sortable?: boolean;
      filterable?: boolean;
      filterVariant?: EFilterVariant;
    };
  };
