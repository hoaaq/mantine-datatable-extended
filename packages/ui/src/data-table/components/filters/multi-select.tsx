import { Button, Checkbox, Indicator, Popover, Stack } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import type { EFilterVariant } from "../../enums";
import { useDataTableQueryParams } from "../../hooks";
import type { ExtendedDataTableColumnProps } from "../../types";

export type TDataTableFilterMultiSelectFacet<T = Record<string, unknown>> = {
  accessor: keyof T | (string & NonNullable<unknown>);
  data: { value: string; label: string }[];
};

type TDataTableFilterMultiSelectProps<T = Record<string, unknown>> = {
  prefixQueryKey?: string;
  column: ExtendedDataTableColumnProps<T>;
  facet: TDataTableFilterMultiSelectFacet<T>;
};

export function DataTableFilterMultiSelect<T = Record<string, unknown>>({
  prefixQueryKey,
  column,
  facet,
}: TDataTableFilterMultiSelectProps<T>) {
  const accessor = column.accessor as string;
  const variant = column.extend?.filterVariant as EFilterVariant;
  const facetData = facet.data;

  const { filters, setFilters } = useDataTableQueryParams({
    prefixQueryKey,
  });
  const thisAccessorFilter = filters.find(
    (filter) => filter.accessor === accessor
  );
  const countFilters = thisAccessorFilter?.value.length ?? 0;

  const onFilterChange = (value: string) => {
    const currentValues = (thisAccessorFilter?.value as string[]) ?? [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    if (newValues.length === 0) {
      // Remove filter if no values remain
      setFilters(filters.filter((filter) => filter.accessor !== accessor));
    } else {
      // Update existing filter or add new one
      const hasFilter = filters.some((filter) => filter.accessor === accessor);
      setFilters(
        hasFilter
          ? filters.map((filter) =>
              filter.accessor === accessor
                ? { ...filter, value: newValues }
                : filter
            )
          : [
              ...filters,
              {
                variant,
                accessor,
                value: newValues,
              },
            ]
      );
    }
  };

  const isChecked = (value: string) => {
    return filters.some(
      (filter) => filter.accessor === accessor && filter.value.includes(value)
    );
  };

  const onResetFilter = () => {
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
        <Stack>
          {facetData.map((data) => (
            <Checkbox
              checked={isChecked(data.value)}
              key={`${accessor}-${data.value}`}
              label={data.label}
              labelPosition="left"
              onChange={() => onFilterChange(data.value)}
              styles={{
                labelWrapper: {
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                },
              }}
              variant="outline"
            />
          ))}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
