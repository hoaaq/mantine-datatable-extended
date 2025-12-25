import { Button, Group } from "@mantine/core";
import { EFilterVariant } from "../enums/data-table-query-param.enum";
import { useDataTableQueryParams } from "../hooks";
import type {
  ExtendedDataTableColumnProps,
  i18nDataTableFilterOptions,
} from "../types";
import { DataTableFilterDate } from "./filters/date";
import { DataTableFilterDateRange } from "./filters/date-range";
import {
  DataTableFilterMultiSelect,
  type TDataTableFilterMultiSelectFacet,
} from "./filters/multi-select";
import {
  DataTableFilterNumber,
  type TDataTableFilterNumberOptions,
} from "./filters/number";
import {
  DataTableFilterNumberRange,
  type TDataTableFilterNumberRangeOptions,
} from "./filters/number-range";
import { DataTableFilterSingleSelect } from "./filters/single-select";
import {
  DataTableFilterText,
  type TDataTableFilterTextOptions,
} from "./filters/text";

type TDataTableFilterProps<T = Record<string, unknown>> = {
  prefixQueryKey?: string;
  columns: ExtendedDataTableColumnProps<T>[];
  facets?: TDataTableFilterMultiSelectFacet<T>[];
  numberRangeOptions?: TDataTableFilterNumberRangeOptions<T>[];
  textOptions?: TDataTableFilterTextOptions<T>[];
  numberOptions?: TDataTableFilterNumberOptions<T>[];
  i18n?: i18nDataTableFilterOptions;
};

const defaultI18n: i18nDataTableFilterOptions = {
  resetFilter: "Reset Filter",
};

export function DataTableFilter<T = Record<string, unknown>>({
  prefixQueryKey,
  columns,
  facets,
  numberRangeOptions,
  textOptions,
  numberOptions,
  i18n = defaultI18n,
}: TDataTableFilterProps<T>) {
  const { filters, setFilters } = useDataTableQueryParams({
    prefixQueryKey,
  });

  const onReset = () => {
    setFilters([]);
  };

  const filterableColumns = columns.filter(
    (column) => column.extend?.filterable
  );

  const getFacet = (accessor: keyof T | (string & NonNullable<unknown>)) => {
    return facets?.find((facet) => facet.accessor === accessor);
  };

  const getNumberRangeOptions = (
    accessor: keyof T | (string & NonNullable<unknown>)
  ) => {
    return numberRangeOptions?.find((option) => option.accessor === accessor);
  };

  const getTextOptions = (
    accessor: keyof T | (string & NonNullable<unknown>)
  ) => {
    return textOptions?.find((option) => option.accessor === accessor);
  };

  const getNumberOptions = (
    accessor: keyof T | (string & NonNullable<unknown>)
  ) => {
    return numberOptions?.find((option) => option.accessor === accessor);
  };

  return (
    <Group gap="xs">
      {filterableColumns.map((column) => {
        switch (column.extend?.filterVariant) {
          case EFilterVariant.TEXT: {
            const textOptions = getTextOptions(column.accessor);
            return (
              <DataTableFilterText
                column={column}
                key={column.accessor as string}
                prefixQueryKey={prefixQueryKey}
                textOptions={textOptions}
              />
            );
          }
          case EFilterVariant.NUMBER: {
            const numberOptions = getNumberOptions(column.accessor);
            return (
              <DataTableFilterNumber
                column={column}
                key={column.accessor as string}
                numberOptions={numberOptions}
                prefixQueryKey={prefixQueryKey}
              />
            );
          }
          case EFilterVariant.SINGLE_SELECT: {
            const facet = getFacet(column.accessor);
            return (
              facet && (
                <DataTableFilterSingleSelect
                  column={column}
                  facet={facet}
                  key={column.accessor as string}
                  prefixQueryKey={prefixQueryKey}
                />
              )
            );
          }
          case EFilterVariant.MULTI_SELECT: {
            const facet = getFacet(column.accessor);
            return (
              facet && (
                <DataTableFilterMultiSelect
                  column={column}
                  facet={facet}
                  key={column.accessor as string}
                  prefixQueryKey={prefixQueryKey}
                />
              )
            );
          }
          case EFilterVariant.DATE: {
            return (
              <DataTableFilterDate
                column={column}
                key={column.accessor as string}
                prefixQueryKey={prefixQueryKey}
              />
            );
          }
          case EFilterVariant.DATE_RANGE: {
            return (
              <DataTableFilterDateRange
                column={column}
                key={column.accessor as string}
                prefixQueryKey={prefixQueryKey}
              />
            );
          }
          case EFilterVariant.NUMBER_RANGE: {
            const numberRangeOptions = getNumberRangeOptions(column.accessor);
            return (
              numberRangeOptions && (
                <DataTableFilterNumberRange
                  column={column}
                  key={column.accessor as string}
                  numberRangeOptions={numberRangeOptions}
                  prefixQueryKey={prefixQueryKey}
                />
              )
            );
          }
          default:
            return null;
        }
      })}
      {filters.length > 0 && (
        <Button onClick={onReset} variant="default">
          {i18n.resetFilter}
        </Button>
      )}
    </Group>
  );
}
