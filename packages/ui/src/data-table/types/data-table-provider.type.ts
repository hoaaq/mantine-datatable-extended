import type { useDataTableColumns } from "mantine-datatable";
import type { TDteColumnProps } from "./data-table-column-extended.type";
import type {
  TFilterCondition,
  TSearchCondition,
  TSortCondition,
} from "./data-table-query-param.type";
import type { TDteI18n, TDteI18nInput } from "./i18n.type";

/**
 * URL query parameter keys for DataTable state (page, pageSize, sorts, search, filters).
 */
export type TUrlKeys = {
  /**
   * The key of the page parameter.
   */
  page: string;
  /**
   * The key of the page size parameter.
   */
  pageSize: string;
  /**
   * The key of the sorts parameter.
   */
  sorts: string;
  /**
   * The key of the search parameter.
   */
  search: string;
  /**
   * The key of the filters parameter.
   */
  filters: string;
};

/**
 * Default values for DataTable query parameters.
 */
export type TDefaultParams = {
  /**
   * The default page number.
   */
  page?: number;
  /**
   * The default page size.
   */
  pageSize?: number;
  /**
   * The default sorts.
   */
  sorts?: TSortCondition[];
  /**
   * The default search.
   */
  search?: TSearchCondition;
  /**
   * The default filters.
   */
  filters?: TFilterCondition[];
};

/**
 * Pagination configuration passed to DataTable context.
 */
type TPaginationProps = {
  /**
   * The total records.
   */
  totalRecords: number;
  /**
   * The records per page options.
   */
  recordsPerPageOptions: number[];
};

/**
 * Context value type for DteProvider.
 */
export type TDteContextProps<T = Record<string, unknown>> = {
  /**
   * The keys of the URL parameters.
   * Useful for multiple data tables on the same page.
   */
  urlKeys?: TUrlKeys;
  /**
   * The default parameters of the data table.
   */
  defaultParams?: TDefaultParams;
  /**
   * The key of the column store.
   * This is used to store the columns of the data table in localStorage for draggable and toggleable columns.
   * Event if you don't want to use the draggable and toggleable columns, you should set this key.
   */
  storeColumnsKey: string;
  /**
   * The columns of the data table.
   * This is use original column properties from mantine-datatable with "extend" property.
   */
  columns: TDteColumnProps<T>[];
  /**
   * The result of the useDataTableColumns hook from mantine-datatable.
   */
  originalUseDataTableColumnsResult: ReturnType<typeof useDataTableColumns<T>>;
  /**
   * The pagination props.
   */
  paginationProps?: TPaginationProps;
  /**
   * The function to set the pagination total records.
   */
  setTotalRecords?: (totalRecords: number) => void;
  /**
   * The function to set the pagination records per page options.
   */
  setRecordsPerPageOptions?: (recordsPerPageOptions: number[]) => void;
  /**
   * Internationalization strings for all DataTable components.
   * In context: merged result (always present).
   * In provider props: optional input, merged with defaults.
   */
  i18n: TDteI18n;
};

/**
 * Props for DteProvider. Extends context props but i18n is optional input.
 */
export type TDteProviderProps<T = Record<string, unknown>> = Omit<
  TDteContextProps<T>,
  "i18n"
> & {
  children: import("react").ReactNode;
  i18n?: TDteI18nInput;
};
