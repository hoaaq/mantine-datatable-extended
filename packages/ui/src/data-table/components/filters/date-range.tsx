import { Button, Indicator, Popover } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconX } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";
import type { EFilterVariant } from "../../enums";
import { useDataTableQueryParams } from "../../hooks";
import type { ExtendedDataTableColumnProps } from "../../types";

type TDataTableFilterDateRangeProps<T = Record<string, unknown>> = {
  prefixQueryKey?: string;
  column: ExtendedDataTableColumnProps<T>;
};

export function DataTableFilterDateRange<T = Record<string, unknown>>({
  prefixQueryKey,
  column,
}: TDataTableFilterDateRangeProps<T>) {
  const accessor = column.accessor as string;
  const variant = column.extend?.filterVariant as EFilterVariant;

  const { filters, setFilters } = useDataTableQueryParams({
    prefixQueryKey,
  });
  const thisAccessorFilter = filters.find(
    (filter) => filter.accessor === accessor
  );
  const countFilters = thisAccessorFilter?.value.length ?? 0;

  const [values, setValues] = useState<[string | null, string | null]>(
    thisAccessorFilter
      ? [
          dayjs(Number.parseInt(thisAccessorFilter.value[0], 10)).toISOString(),
          dayjs(Number.parseInt(thisAccessorFilter.value[1], 10)).toISOString(),
        ]
      : [null, null]
  );

  const onFilterChange = ([fromDate, toDate]: [
    string | null,
    string | null,
  ]) => {
    setValues([fromDate, toDate]);
    if (fromDate && toDate) {
      const [fromDateTimestamp, toDateTimestamp] = [
        dayjs(fromDate).valueOf().toString(),
        dayjs(toDate).valueOf().toString(),
      ];
      if (thisAccessorFilter) {
        setFilters(
          filters.map((filter) =>
            filter.accessor === accessor
              ? { ...filter, value: [fromDateTimestamp, toDateTimestamp] }
              : filter
          )
        );
      } else {
        setFilters([
          ...filters,
          {
            variant,
            accessor,
            value: [fromDateTimestamp, toDateTimestamp],
          },
        ]);
      }
    }
  };

  const onResetFilter = () => {
    setValues([null, null]);
    setFilters(filters.filter((filter) => filter.accessor !== accessor));
  };

  return (
    <Popover shadow="md" width="max-content" withArrow>
      <Popover.Target>
        <Indicator disabled={countFilters <= 0} processing>
          <Button.Group>
            {countFilters > 0 && (
              <Button onClick={onResetFilter} px="xs" variant="default">
                <IconX size={16} />
              </Button>
            )}
            <Button variant="default">{column.title}</Button>
          </Button.Group>
        </Indicator>
      </Popover.Target>
      <Popover.Dropdown>
        <DatePicker
          allowSingleDateInRange
          onChange={onFilterChange}
          type="range"
          value={values}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
