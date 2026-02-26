import {
  Button,
  Group,
  Indicator,
  NumberInput,
  Popover,
  RangeSlider,
  type RangeSliderValue,
  Stack,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useDteQueryParams } from "../../hooks";
import type {
  EFilterVariant,
  TDteColumnProps,
  TFilterNumberRangeOptions,
} from "../../types";

type TDteFilterNumberRangeProps<T = Record<string, unknown>> = {
  column: TDteColumnProps<T>;
};

export function DteFilterNumberRange<T = Record<string, unknown>>({
  column,
}: TDteFilterNumberRangeProps<T>) {
  const accessor = column.accessor as string;
  const variant = column.extend?.filterVariant as EFilterVariant;
  const {
    min,
    max,
    step = 1,
    minRange = 1,
    suffix,
  } = column.extend?.filterOptions as TFilterNumberRangeOptions;

  const { filters, setFilters } = useDteQueryParams();
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

  const currentValue: [number, number] =
    thisAccessorFilter?.value[0] && thisAccessorFilter?.value[1]
      ? [
          Number.parseInt(thisAccessorFilter.value[0], 10),
          Number.parseInt(thisAccessorFilter.value[1], 10),
        ]
      : [min, max];

  const onFilterChange = ([fromValue, toValue]: RangeSliderValue) => {
    setFilterValues([fromValue, toValue]);
  };

  const onFromInputChange = (value: string | number) => {
    const numValue =
      typeof value === "string" ? Number.parseInt(value, 10) || min : value;
    const clampedFrom = Math.min(Math.max(numValue, min), currentValue[1]);
    setFilterValues([clampedFrom, currentValue[1]]);
  };

  const onToInputChange = (value: string | number) => {
    const numValue =
      typeof value === "string" ? Number.parseInt(value, 10) || max : value;
    const clampedTo = Math.max(Math.min(numValue, max), currentValue[0]);
    setFilterValues([currentValue[0], clampedTo]);
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
      <Popover.Dropdown p="xs">
        <Stack gap="md">
          <Group grow>
            <NumberInput
              max={currentValue[1]}
              min={min}
              onChange={onFromInputChange}
              step={step}
              suffix={suffix}
              value={currentValue[0]}
            />
            <NumberInput
              max={max}
              min={currentValue[0]}
              onChange={onToInputChange}
              step={step}
              suffix={suffix}
              value={currentValue[1]}
            />
          </Group>
          <RangeSlider
            label={null}
            max={max}
            min={min}
            minRange={minRange}
            onChange={onFilterChange}
            step={step}
            value={currentValue}
          />
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
