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

export type DataTableExtendedColumnProps<T = Record<string, unknown>> =
  DataTableColumn<T> & {
    /**
     * The extended properties of the column.
     */
    extend?: FilterableExtend;
  };
