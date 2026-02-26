import { Button, Group } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useDteQueryParams } from "../hooks";
import { useDteContext } from "../provider";
import { EFilterVariant } from "../types";
import { DteFilterDate } from "./filters/date";
import { DteFilterDateRange } from "./filters/date-range";
import { DteFilterMultiSelect } from "./filters/multi-select";
import { DteFilterNumber } from "./filters/number";
import { DteFilterNumberRange } from "./filters/number-range";
import { DteFilterSingleSelect } from "./filters/single-select";
import { DteFilterText } from "./filters/text";

export function DteFilter() {
  const { filters, resetFilters } = useDteQueryParams();
  const { columns, i18n } = useDteContext();

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
              <DteFilterText column={column} key={column.accessor as string} />
            );
          }
          case EFilterVariant.NUMBER: {
            return (
              <DteFilterNumber
                column={column}
                key={column.accessor as string}
              />
            );
          }
          case EFilterVariant.SINGLE_SELECT: {
            return (
              <DteFilterSingleSelect
                column={column}
                key={column.accessor as string}
              />
            );
          }
          case EFilterVariant.MULTI_SELECT: {
            return (
              <DteFilterMultiSelect
                column={column}
                key={column.accessor as string}
              />
            );
          }
          case EFilterVariant.DATE: {
            return (
              <DteFilterDate column={column} key={column.accessor as string} />
            );
          }
          case EFilterVariant.DATE_RANGE: {
            return (
              <DteFilterDateRange
                column={column}
                key={column.accessor as string}
              />
            );
          }
          case EFilterVariant.NUMBER_RANGE: {
            return (
              <DteFilterNumberRange
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
