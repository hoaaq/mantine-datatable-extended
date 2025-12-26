import { Button, Checkbox, Indicator, Popover, Stack } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useDataTableQueryParams } from "../../hooks";
import type { EFilterVariant, ExtendedDataTableColumnProps } from "../../types";

export type TDataTableFilterSingleSelectFacet<T = Record<string, unknown>> = {
  accessor: keyof T | (string & NonNullable<unknown>);
  data: { value: string; label: string }[];
};

type TDataTableFilterSingleSelectProps<T = Record<string, unknown>> = {
  prefixQueryKey?: string;
  column: ExtendedDataTableColumnProps<T>;
  facet: TDataTableFilterSingleSelectFacet<T>;
};

export function DataTableFilterSingleSelect<T = Record<string, unknown>>({
  prefixQueryKey,
  column,
  facet,
}: TDataTableFilterSingleSelectProps<T>) {
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
    if (thisAccessorFilter) {
      setFilters(
        filters.map((filter) =>
          filter.accessor === accessor ? { ...filter, value } : filter
        )
      );
    } else {
      setFilters([...filters, { variant, accessor, value }]);
    }
  };

  const isChecked = (value: string) => {
    return thisAccessorFilter?.value === value;
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
              radius="xl"
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
