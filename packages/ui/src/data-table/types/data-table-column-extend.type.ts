import type { DataTableColumn } from "mantine-datatable";
import type {
  FilterMultiSelectOptions,
  FilterNumberRangeOptions,
  FilterSingleSelectOptions,
} from "./data-table-filter-options.type";

// Base extend type with discriminated union
type BaseExtend = {
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
type FilterableExtend = BaseExtend &
  (
    | {
        filterVariant?: "text" | "number" | "date" | "date_range";
        filterOptions?: never;
      }
    | {
        filterVariant: "number_range";
        filterOptions: FilterNumberRangeOptions;
      }
    | {
        filterVariant: "single_select";
        filterOptions: FilterSingleSelectOptions;
      }
    | {
        filterVariant: "multi_select";
        filterOptions: FilterMultiSelectOptions;
      }
  );

export type DataTableExtendedColumnProps<T = Record<string, unknown>> = Omit<
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
  extend?: FilterableExtend;
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
