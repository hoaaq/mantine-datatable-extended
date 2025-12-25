import type { TSortCondition } from "./data-table-query-params";

export type ExtendedDataTableProps = {
  prefixQueryKey?: string;
  defaultSorts?: TSortCondition[];
};
