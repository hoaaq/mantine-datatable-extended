import type { useDataTableColumns } from "mantine-datatable";
import type { DataTableExtendedColumnProps } from "./data-table-column-extend.type";
import type {
  TFilterCondition,
  TSearchCondition,
  TSortCondition,
} from "./data-table-query-param.type";

export type UrlKeysType = {
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

export type DefaultParamsType = {
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

export type PaginationPropsType = {
  /**
   * The total records.
   */
  totalRecords: number;
  /**
   * The records per page options.
   */
  recordsPerPageOptions: number[];
};

export type DataTableContextProps<T = Record<string, unknown>> = {
  /**
   * The keys of the URL parameters.
   * Useful for multiple data tables on the same page.
   */
  urlKeys?: UrlKeysType;
  /**
   * The default parameters of the data table.
   */
  defaultParams?: DefaultParamsType;
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
  columns: DataTableExtendedColumnProps<T>[];
  /**
   * The result of the useDataTableColumns hook from mantine-datatable.
   */
  originalUseDataTableColumnsResult: ReturnType<typeof useDataTableColumns<T>>;
  /**
   * The pagination props.
   */
  paginationProps?: PaginationPropsType;
  /**
   * The function to set the pagination props.
   */
  setPaginationProps?: (props: PaginationPropsType) => void;
};
