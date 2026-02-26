type TDteViewOptions = {
  /**
   * The label for the columns toggle button.
   */
  columnsToggle: string;
  /**
   * The placeholder for the columns search input.
   */
  columnsToggleSearchPlaceholder: string;
};

type TDteSortOptions = {
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

type TDteSearchOptions = {
  /**
   * The label for the search input placeholder.
   */
  search: string;
  /**
   * The placeholder for the search accessors filter input.
   */
  searchAccessorsSearchPlaceholder: string;
};

type TDteFilterOptions = {
  /**
   * The label for the reset filter button.
   */
  resetFilter: string;
};

type TDtePaginationOptions = {
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
export type TDteI18n = {
  view: TDteViewOptions;
  sort: TDteSortOptions;
  search: TDteSearchOptions;
  filter: TDteFilterOptions;
  pagination: TDtePaginationOptions;
};

/**
 * Input type for i18n prop in DteProvider.
 * Each group is optional - only override the keys you need.
 */
export type TDteI18nInput = {
  view?: Partial<TDteViewOptions>;
  sort?: Partial<TDteSortOptions>;
  search?: Partial<TDteSearchOptions>;
  filter?: Partial<TDteFilterOptions>;
  pagination?: Partial<TDtePaginationOptions>;
};

/**
 * Default i18n values for DataTable components.
 */
export const DEFAULT_DTE_I18N: TDteI18n = {
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
