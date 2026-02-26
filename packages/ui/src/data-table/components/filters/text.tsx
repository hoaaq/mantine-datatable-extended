import { Button, Indicator, Popover, TextInput } from "@mantine/core";
import { IconFilter, IconX } from "@tabler/icons-react";
import { useDteQueryParams } from "../../hooks";
import type { EFilterVariant, TDteColumnProps } from "../../types";

type TDteFilterTextProps<T = Record<string, unknown>> = {
  column: TDteColumnProps<T>;
};

export function DteFilterText<T = Record<string, unknown>>({
  column,
}: TDteFilterTextProps<T>) {
  const accessor = column.accessor as string;
  const variant = column.extend?.filterVariant as EFilterVariant;

  const { filters, setFilters } = useDteQueryParams();
  const thisAccessorFilter = filters.find(
    (filter) => filter.accessor === accessor
  );
  const countFilters = thisAccessorFilter?.value.length ?? 0;

  const setFilterValue = (value: string) => {
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
  };

  const onFilterChange = (value: string) => {
    setFilterValue(value);
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
      <Popover.Dropdown p="0">
        <TextInput
          autoFocus
          leftSection={<IconFilter size={16} />}
          onChange={(event) => onFilterChange(event.target.value)}
          p="4"
          value={thisAccessorFilter?.value ?? ""}
          variant="unstyled"
        />
      </Popover.Dropdown>
    </Popover>
  );
}
