import { Button, Group } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useDataTableQueryParams } from "../hooks";
import { useDataTableContext } from "../provider";
import { EFilterVariant } from "../types";
import { DataTableFilterDate } from "./filters/date";
import { DataTableFilterDateRange } from "./filters/date-range";
import { DataTableFilterMultiSelect } from "./filters/multi-select";
import { DataTableFilterNumber } from "./filters/number";
import { DataTableFilterNumberRange } from "./filters/number-range";
import { DataTableFilterSingleSelect } from "./filters/single-select";
import { DataTableFilterText } from "./filters/text";

export function DataTableFilter() {
  const { filters, resetFilters } = useDataTableQueryParams();
  const { columns, i18n } = useDataTableContext();

  const onReset = () => {
    resetFilters();
  };

  const filterableColumns = columns.filter(
    (column) => column.extend?.filterable
  );

  return (
    <Group gap="xs">
      {filterableColumns.map((column) => {
        switch (column.extend?.filterVariant) {
          case EFilterVariant.TEXT: {
            return (
              <DataTableFilterText
                column={column}
                key={column.accessor as string}
              />
            );
          }
          case EFilterVariant.NUMBER: {
            return (
              <DataTableFilterNumber
                column={column}
                key={column.accessor as string}
              />
            );
          }
          case EFilterVariant.SINGLE_SELECT: {
            return (
              <DataTableFilterSingleSelect
                column={column}
                key={column.accessor as string}
              />
            );
          }
          case EFilterVariant.MULTI_SELECT: {
            return (
              <DataTableFilterMultiSelect
                column={column}
                key={column.accessor as string}
              />
            );
          }
          case EFilterVariant.DATE: {
            return (
              <DataTableFilterDate
                column={column}
                key={column.accessor as string}
              />
            );
          }
          case EFilterVariant.DATE_RANGE: {
            return (
              <DataTableFilterDateRange
                column={column}
                key={column.accessor as string}
              />
            );
          }
          case EFilterVariant.NUMBER_RANGE: {
            return (
              <DataTableFilterNumberRange
                column={column}
                key={column.accessor as string}
              />
            );
          }
          default:
            return null;
        }
      })}
      {filters.length > 0 && (
        <Button
          color="red"
          leftSection={<IconX size={16} />}
          onClick={onReset}
          variant="outline"
        >
          {i18n.filter.resetFilter}
        </Button>
      )}
    </Group>
  );
}
