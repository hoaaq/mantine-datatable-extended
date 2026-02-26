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
import { useDteQueryParams } from "../../hooks";
import type {
  EFilterVariant,
  TDteColumnProps,
  TFilterSingleSelectOptions,
} from "../../types";

type TDteFilterSingleSelectProps<T = Record<string, unknown>> = {
  column: TDteColumnProps<T>;
};

export function DteFilterSingleSelect<T = Record<string, unknown>>({
  column,
}: TDteFilterSingleSelectProps<T>) {
  const accessor = column.accessor as string;
  const variant = column.extend?.filterVariant as EFilterVariant;
  const filterOptions = column.extend
    ?.filterOptions as TFilterSingleSelectOptions;
  const filterOptionsData = filterOptions.data;

  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    if (!search.trim()) {
      return filterOptionsData;
    }
    const query = search.toLowerCase().trim();
    return filterOptionsData.filter((data: { value: string; label: string }) =>
      data.label.toLowerCase().includes(query)
    );
  }, [filterOptionsData, search]);

  const { filters, setFilters } = useDteQueryParams();
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
            {filteredOptions.map((data: { value: string; label: string }) => (
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
                radius="xl"
                size="xs"
                styles={{
                  labelWrapper: {
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  },
                }}
              />
            ))}
          </Stack>
        </ScrollArea.Autosize>
      </Popover.Dropdown>
    </Popover>
  );
}
