import {
  Button,
  Checkbox,
  Divider,
  Indicator,
  Popover,
  ScrollArea,
  Stack,
  TextInput,
} from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useDataTableQueryParams } from "../../hooks";
import type {
  DataTableExtendedColumnProps,
  EFilterVariant,
  FilterMultiSelectOptions,
} from "../../types";

type TDataTableFilterMultiSelectProps<T = Record<string, unknown>> = {
  column: DataTableExtendedColumnProps<T>;
};

export function DataTableFilterMultiSelect<T = Record<string, unknown>>({
  column,
}: TDataTableFilterMultiSelectProps<T>) {
  const accessor = column.accessor as string;
  const variant = column.extend?.filterVariant as EFilterVariant;
  const filterOptions = column.extend
    ?.filterOptions as FilterMultiSelectOptions;
  const filterOptionsData = filterOptions.data;

  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    if (!search.trim()) {
      return filterOptionsData;
    }
    const query = search.toLowerCase().trim();
    return filterOptionsData.filter((data) =>
      data.label.toLowerCase().includes(query)
    );
  }, [filterOptionsData, search]);

  const { filters, setFilters } = useDataTableQueryParams();
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
      <Popover.Dropdown p="0">
        <TextInput
          autoFocus
          leftSection={<IconSearch size={16} />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          p="4"
          styles={{
            input: {
              border: "none",
            },
          }}
          value={search}
        />
        <Divider />
        <ScrollArea.Autosize mah={180} type="auto">
          <Stack gap="0">
            {filteredOptions.map((data) => (
              <Checkbox
                checked={isChecked(data.value)}
                classNames={{
                  root: "mantine-dte-checkbox-root",
                  body: "mantine-dte-checkbox-body",
                  labelWrapper: "mantine-dte-checkbox-label-wrapper",
                  label: "mantine-dte-checkbox-label",
                  input: "mantine-dte-checkbox-input",
                  icon: "mantine-dte-checkbox-icon",
                }}
                key={`${accessor}-${data.value}`}
                label={data.label}
                labelPosition="left"
                onChange={() => onFilterChange(data.value)}
                size="xs"
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
        </ScrollArea.Autosize>
      </Popover.Dropdown>
    </Popover>
  );
}
