import { Button, Indicator, Popover } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconX } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";
import type { EFilterVariant } from "../../enums";
import { useDataTableQueryParams } from "../../hooks";
import type { ExtendedDataTableColumnProps } from "../../types";

type TDataTableFilterDateProps<T = Record<string, unknown>> = {
  prefixQueryKey?: string;
  column: ExtendedDataTableColumnProps<T>;
};

export function DataTableFilterDate<T = Record<string, unknown>>({
  prefixQueryKey,
  column,
}: TDataTableFilterDateProps<T>) {
  const accessor = column.accessor as string;
  const variant = column.extend?.filterVariant as EFilterVariant;

  const { filters, setFilters } = useDataTableQueryParams({
    prefixQueryKey,
  });
  const thisAccessorFilter = filters.find(
    (filter) => filter.accessor === accessor
  );
  const countFilters = thisAccessorFilter?.value ? 1 : 0;

  const [value, setValue] = useState<string | null>(
    thisAccessorFilter
      ? dayjs(
          Number.parseInt(thisAccessorFilter.value as string, 10)
        ).toISOString()
      : null
  );

  const onFilterChange = (value: string | null) => {
    setValue(value);
    if (value) {
      const valueTimestamp = dayjs(value).valueOf().toString();
      if (thisAccessorFilter) {
        setFilters(
          filters.map((filter) =>
            filter.accessor === accessor
              ? { ...filter, value: valueTimestamp }
              : filter
          )
        );
      } else {
        setFilters([
          ...filters,
          {
            variant,
            accessor,
            value: valueTimestamp,
          },
        ]);
      }
    }
  };

  const onResetFilter = () => {
    setValue(null);
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
        <DatePicker onChange={onFilterChange} value={value} />
      </Popover.Dropdown>
    </Popover>
  );
}
