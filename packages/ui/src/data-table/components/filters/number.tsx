import { Button, Indicator, NumberInput, Popover } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDataTableQueryParams } from "../../hooks";
import type { EFilterVariant, ExtendedDataTableColumnProps } from "../../types";

export type TDataTableFilterNumberOptions<T = Record<string, unknown>> = {
  accessor: keyof T | (string & NonNullable<unknown>);
  debounceTimeout?: number;
};

type TDataTableFilterNumberProps<T = Record<string, unknown>> = {
  prefixQueryKey?: string;
  column: ExtendedDataTableColumnProps<T>;
  numberOptions?: TDataTableFilterNumberOptions<T>;
};

export function DataTableFilterNumber<T = Record<string, unknown>>({
  prefixQueryKey,
  column,
  numberOptions,
}: TDataTableFilterNumberProps<T>) {
  const accessor = column.accessor as string;
  const variant = column.extend?.filterVariant as EFilterVariant;
  const { debounceTimeout = 300 } = numberOptions ?? { debounceTimeout: 300 };

  const { filters, setFilters } = useDataTableQueryParams({
    prefixQueryKey,
  });
  const thisAccessorFilter = filters.find(
    (filter) => filter.accessor === accessor
  );
  const countFilters = thisAccessorFilter?.value.length ?? 0;

  const [value, setValue] = useState<number | undefined>(
    thisAccessorFilter
      ? Number.parseInt(thisAccessorFilter.value as string, 10)
      : undefined
  );

  const debouncedSetFilterValue = useDebouncedCallback((value: number) => {
    if (thisAccessorFilter) {
      setFilters(
        filters.map((filter) =>
          filter.accessor === accessor
            ? { ...filter, value: value.toString() }
            : filter
        )
      );
    } else {
      setFilters([...filters, { variant, accessor, value: value.toString() }]);
    }
  }, debounceTimeout);

  const onFilterChange = (value: number | string) => {
    let val = value as number;
    if (typeof value === "string") {
      val = Number.parseInt(value, 10);
    }
    setValue(val);
    debouncedSetFilterValue(val);
  };

  const onResetFilter = () => {
    setValue(undefined);
    setFilters(filters.filter((filter) => filter.accessor !== accessor));
  };

  return (
    <Popover shadow="md" width="250px" withArrow>
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
        <NumberInput
          onChange={(value) => onFilterChange(value)}
          value={value}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
