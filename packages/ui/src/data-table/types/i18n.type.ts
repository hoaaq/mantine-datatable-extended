type i18nDataTableViewOptions = {
  /**
   * The label for the columns toggle button.
   */
  columnsToggle: string;
  /**
   * The placeholder for the columns search input.
   */
  columnsToggleSearchPlaceholder: string;
};

type i18nDataTableSortOptions = {
  /**
   * The label for the sort button.
   */
  sort: string;
  /**
   * The label for the add sort button.
   */
  addSort: string;
  /**
   * The label for the reset sort button.
   */
  resetSort: string;
  /**
   * The label for the ascending sort direction.
   */
  asc: string;
  /**
   * The label for the descending sort direction.
   */
  desc: string;
};

type i18nDataTableSearchOptions = {
  /**
   * The label for the search input placeholder.
   */
  search: string;
  /**
   * The placeholder for the search accessors filter input.
   */
  searchAccessorsSearchPlaceholder: string;
};

type i18nDataTableFilterOptions = {
  /**
   * The label for the reset filter button.
   */
  resetFilter: string;
};

type i18nDataTablePaginationOptions = {
  /**
   * The label for the rows per page.
   */
  rowsPerPage: string;
  /**
   * The label for the page of total pages.
   * The first string is "Page".
   * The second string is "of".
   */
  pageOfTotalPages: [string, string];
  /**
   * The label for the start record - end record / total records.
   * The first string is "From".
   * The second string is "to".
   * The third string is "of total".
   */
  startEndRecordOfTotalRecords: [string, string, string];
};

/**
 * Unified i18n type for all DataTable components.
 * Grouped by component - full type stored in context (after merging with defaults).
 */
export type DataTableI18n = {
  view: i18nDataTableViewOptions;
  sort: i18nDataTableSortOptions;
  search: i18nDataTableSearchOptions;
  filter: i18nDataTableFilterOptions;
  pagination: i18nDataTablePaginationOptions;
};

/**
 * Input type for i18n prop in DataTableProvider.
 * Each group is optional - only override the keys you need.
 */
export type DataTableI18nInput = {
  view?: Partial<i18nDataTableViewOptions>;
  sort?: Partial<i18nDataTableSortOptions>;
  search?: Partial<i18nDataTableSearchOptions>;
  filter?: Partial<i18nDataTableFilterOptions>;
  pagination?: Partial<i18nDataTablePaginationOptions>;
};

/**
 * Default i18n values for DataTable components.
 */
export const DEFAULT_DATA_TABLE_I18N: DataTableI18n = {
  view: {
    columnsToggle: "Columns Toggle",
    columnsToggleSearchPlaceholder: "Search columns…",
  },
  sort: {
    sort: "Sort",
    addSort: "Add Sort",
    resetSort: "Reset Sort",
    asc: "Asc",
    desc: "Desc",
  },
  search: {
    search: "Search",
    searchAccessorsSearchPlaceholder: "Search columns…",
  },
  filter: {
    resetFilter: "Reset Filters",
  },
  pagination: {
    rowsPerPage: "Rows per page",
    pageOfTotalPages: ["Page", "of"],
    startEndRecordOfTotalRecords: ["", "-", "/"],
  },
};
