import { Button, Indicator, Popover, RangeSlider } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import type { EFilterVariant } from "../../enums";
import { useDataTableQueryParams } from "../../hooks";
import type { ExtendedDataTableColumnProps } from "../../types";

export type TDataTableFilterNumberRangeOptions<T = Record<string, unknown>> = {
  accessor: keyof T | (string & NonNullable<unknown>);
  min: number;
  max: number;
  step?: number;
  minRange?: number;
  debounceTimeout?: number;
};

type TDataTableFilterNumberRangeProps<T = Record<string, unknown>> = {
  prefixQueryKey?: string;
  column: ExtendedDataTableColumnProps<T>;
  numberRangeOptions: TDataTableFilterNumberRangeOptions<T>;
};

export function DataTableFilterNumberRange<T = Record<string, unknown>>({
  prefixQueryKey,
  column,
  numberRangeOptions,
}: TDataTableFilterNumberRangeProps<T>) {
  const accessor = column.accessor as string;
  const variant = column.extend?.filterVariant as EFilterVariant;
  const {
    min,
    max,
    step = 1,
    minRange = 1,
    debounceTimeout = 300,
  } = numberRangeOptions;

  const { filters, setFilters } = useDataTableQueryParams({
    prefixQueryKey,
  });
  const thisAccessorFilter = filters.find(
    (filter) => filter.accessor === accessor
  );
  const countFilters = thisAccessorFilter?.value.length ?? 0;

  const [values, setValues] = useState<[number, number]>(
    thisAccessorFilter
      ? [
          Number.parseInt(thisAccessorFilter.value[0], 10),
          Number.parseInt(thisAccessorFilter.value[1], 10),
        ]
      : [min, max]
  );

  const debouncedSetFilterValues = useDebouncedCallback(
    (values: [number, number]) => {
      const [fromValueString, toValueString] = [
        values[0].toString(),
        values[1].toString(),
      ];
      if (thisAccessorFilter) {
        setFilters(
          filters.map((filter) =>
            filter.accessor === accessor
              ? { ...filter, value: [fromValueString, toValueString] }
              : filter
          )
        );
      } else {
        setFilters([
          ...filters,
          { variant, accessor, value: [fromValueString, toValueString] },
        ]);
      }
    },
    debounceTimeout
  );

  const onFilterChange = ([fromValue, toValue]: [number, number]) => {
    setValues([fromValue, toValue]);
    if (fromValue && toValue) {
      debouncedSetFilterValues([fromValue, toValue]);
    }
  };

  const onResetFilter = () => {
    setValues([min, max]);
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
        <RangeSlider
          max={max}
          min={min}
          minRange={minRange}
          onChange={onFilterChange}
          step={step}
          value={values}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
