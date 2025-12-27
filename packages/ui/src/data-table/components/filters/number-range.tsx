import {
  Button,
  Indicator,
  Popover,
  RangeSlider,
  type RangeSliderValue,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useDataTableQueryParams } from "../../hooks";
import type {
  DataTableExtendedColumnProps,
  EFilterVariant,
  FilterNumberRangeOptions,
} from "../../types";

type TDataTableFilterNumberRangeProps<T = Record<string, unknown>> = {
  column: DataTableExtendedColumnProps<T>;
};

export function DataTableFilterNumberRange<T = Record<string, unknown>>({
  column,
}: TDataTableFilterNumberRangeProps<T>) {
  const accessor = column.accessor as string;
  const variant = column.extend?.filterVariant as EFilterVariant;
  const {
    min,
    max,
    step = 1,
    minRange = 1,
  } = column.extend?.filterOptions as FilterNumberRangeOptions;

  const { filters, setFilters } = useDataTableQueryParams();
  const thisAccessorFilter = filters.find(
    (filter) => filter.accessor === accessor
  );
  const countFilters = thisAccessorFilter?.value.length ?? 0;

  const setFilterValues = (values: [number, number]) => {
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
  };

  const onFilterChange = ([fromValue, toValue]: RangeSliderValue) => {
    setFilterValues([fromValue, toValue]);
  };

  const onResetFilter = () => {
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
          value={
            thisAccessorFilter?.value[0] && thisAccessorFilter?.value[1]
              ? [
                  Number.parseInt(thisAccessorFilter.value[0], 10),
                  Number.parseInt(thisAccessorFilter.value[1], 10),
                ]
              : [min, max]
          }
        />
      </Popover.Dropdown>
    </Popover>
  );
}
