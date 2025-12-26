import { Button, Indicator, Popover, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDataTableQueryParams } from "../../hooks";
import type { EFilterVariant, ExtendedDataTableColumnProps } from "../../types";

export type TDataTableFilterTextOptions<T = Record<string, unknown>> = {
  accessor: keyof T | (string & NonNullable<unknown>);
  debounceTimeout?: number;
};

type TDataTableFilterTextProps<T = Record<string, unknown>> = {
  prefixQueryKey?: string;
  column: ExtendedDataTableColumnProps<T>;
  textOptions?: TDataTableFilterTextOptions<T>;
};

export function DataTableFilterText<T = Record<string, unknown>>({
  prefixQueryKey,
  column,
  textOptions,
}: TDataTableFilterTextProps<T>) {
  const accessor = column.accessor as string;
  const variant = column.extend?.filterVariant as EFilterVariant;
  const { debounceTimeout = 300 } = textOptions ?? { debounceTimeout: 300 };

  const { filters, setFilters } = useDataTableQueryParams({
    prefixQueryKey,
  });
  const thisAccessorFilter = filters.find(
    (filter) => filter.accessor === accessor
  );
  const countFilters = thisAccessorFilter?.value.length ?? 0;

  const [value, setValue] = useState<string>(
    thisAccessorFilter ? (thisAccessorFilter.value as string) : ""
  );

  const debouncedSetFilterValue = useDebouncedCallback((value: string) => {
    if (thisAccessorFilter) {
      if (value === "") {
        setFilters(filters.filter((filter) => filter.accessor !== accessor));
      } else {
        setFilters(
          filters.map((filter) =>
            filter.accessor === accessor ? { ...filter, value } : filter
          )
        );
      }
    } else {
      setFilters([...filters, { variant, accessor, value }]);
    }
  }, debounceTimeout);

  const onFilterChange = (value: string) => {
    setValue(value);
    debouncedSetFilterValue(value);
  };

  const onResetFilter = () => {
    setValue("");
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
        <TextInput
          onChange={(event) => onFilterChange(event.target.value)}
          value={value}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
