import type { DataTableColumn } from "mantine-datatable";
import type {
  TFilterMultiSelectOptions,
  TFilterNumberRangeOptions,
  TFilterSingleSelectOptions,
} from "./data-table-filter-options.type";

// Base extend type with discriminated union
type TBaseExtend = {
  /**
   * Whether the column is searchable.
   */
  searchable?: boolean;
  /**
   * Whether the column is sortable.
   */
  sortable?: boolean;
  /**
   * Whether the column is filterable.
   */
  filterable?: boolean;
};

// Discriminated union for filterable columns
type TFilterableExtend = TBaseExtend &
  (
    | {
        filterVariant?: "text" | "number" | "date" | "date_range";
        filterOptions?: never;
      }
    | {
        filterVariant: "number_range";
        filterOptions: TFilterNumberRangeOptions;
      }
    | {
        filterVariant: "single_select";
        filterOptions: TFilterSingleSelectOptions;
      }
    | {
        filterVariant: "multi_select";
        filterOptions: TFilterMultiSelectOptions;
      }
  );

/**
 * Extended column props for DataTable with search, sort, and filter support.
 * Extends mantine-datatable's DataTableColumn with an optional `extend` property.
 */
export type TDteColumnProps<T = Record<string, unknown>> = Omit<
  DataTableColumn<T>,
  | "sortable"
  | "sortKey"
  | "filter"
  | "filterPopoverProps"
  | "filterPopoverDisableClickOutside"
  | "filtering"
  | "ellipsis"
  | "noWrap"
> & {
  /**
   * The extended properties of the column.
   */
  extend?: TFilterableExtend;
} & ( // Omit and then add these properties because TS wrongly compiles discriminated union types from mantine-datatable
    | {
        /**
         * If true, cell content in this column will be truncated with ellipsis as needed and will not wrap
         * to multiple lines (i.e. `overflow: hidden; text-overflow: ellipsis`; `white-space: nowrap`).
         * On a column, you can either set this property or `noWrap`, but not both.
         */
        ellipsis?: boolean;

        noWrap?: never;
      }
    | {
        ellipsis?: never;

        /**
         * If true, cell content in this column will not wrap to multiple lines (i.e. `white-space: nowrap`).
         * This is useful for columns containing long strings.
         * On a column, you can either set this property or `ellipsis`, but not both.
         */
        noWrap?: boolean;
      }
  );
