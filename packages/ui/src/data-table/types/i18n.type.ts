export type i18nDataTableViewOptions = {
  /**
   * The label for the columns toggle button.
   */
  columnsToggle: string;
  /**
   * The placeholder for the columns search input.
   */
  columnsToggleSearchPlaceholder: string;
};

export type i18nDataTableSortOptions = {
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

export type i18nDataTableSearchOptions = {
  /**
   * The label for the search input placeholder.
   */
  search: string;
  /**
   * The placeholder for the search accessors filter input.
   */
  searchAccessorsSearchPlaceholder: string;
};

export type i18nDataTableFilterOptions = {
  /**
   * The label for the reset filter button.
   */
  resetFilter: string;
};

export type i18nDataTablePaginationOptions = {
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
