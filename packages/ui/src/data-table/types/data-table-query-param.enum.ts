/**
 * Sort direction values for DataTable columns.
 */
export const ESortDirection = {
  ASC: "asc",
  DESC: "desc",
} as const;
export type ESortDirection =
  (typeof ESortDirection)[keyof typeof ESortDirection];

/**
 * Filter variant types for DataTable columns.
 */
export const EFilterVariant = {
  TEXT: "text",
  NUMBER: "number",
  NUMBER_RANGE: "number_range",
  DATE: "date",
  DATE_RANGE: "date_range",
  SINGLE_SELECT: "single_select",
  MULTI_SELECT: "multi_select",
} as const;
export type EFilterVariant =
  (typeof EFilterVariant)[keyof typeof EFilterVariant];
