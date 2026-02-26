import { Button, Indicator, NumberInput, Popover } from "@mantine/core";
import { IconFilter, IconX } from "@tabler/icons-react";
import { useDataTableQueryParams } from "../../hooks";
import type { DataTableExtendedColumnProps, EFilterVariant } from "../../types";

type TDataTableFilterNumberProps<T = Record<string, unknown>> = {
  column: DataTableExtendedColumnProps<T>;
};

export function DataTableFilterNumber<T = Record<string, unknown>>({
  column,
}: TDataTableFilterNumberProps<T>) {
  const accessor = column.accessor as string;
  const variant = column.extend?.filterVariant as EFilterVariant;

  const { filters, setFilters } = useDataTableQueryParams();
  const thisAccessorFilter = filters.find(
    (filter) => filter.accessor === accessor
  );
  const countFilters = thisAccessorFilter?.value.length ?? 0;

  const setFilterValue = (value: number) => {
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
  };

  const onFilterChange = (value: number | string) => {
    let val = value as number;
    if (typeof value === "string") {
      val = Number.parseInt(value, 10);
    }
    setFilterValue(val);
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
        <NumberInput
          autoFocus
          leftSection={<IconFilter size={16} />}
          onChange={(value) => onFilterChange(value)}
          p="4"
          value={
            thisAccessorFilter?.value
              ? Number.parseInt(thisAccessorFilter.value as string, 10)
              : undefined
          }
          variant="unstyled"
        />
      </Popover.Dropdown>
    </Popover>
  );
}
