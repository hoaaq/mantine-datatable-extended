import {
  ActionIcon,
  Badge,
  Checkbox,
  CloseButton,
  Group,
  Indicator,
  Popover,
  Stack,
  TextInput,
} from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useDataTableQueryParams } from "../hooks";
import type {
  ExtendedDataTableColumnProps,
  i18nDataTableSearchOptions,
} from "../types";

type TDataTableSearchAccessorsToggleProps<T = Record<string, unknown>> = {
  prefixQueryKey?: string;
  columns: ExtendedDataTableColumnProps<T>[];
};

function DataTableSearchAccessorsToggle<T = Record<string, unknown>>({
  prefixQueryKey,
  columns,
}: TDataTableSearchAccessorsToggleProps<T>) {
  const { search, setSearch } = useDataTableQueryParams({
    prefixQueryKey,
  });
  const countSearches = search.accessors.length;

  const searchableColumns = columns.filter(
    (column) => column.extend?.searchable
  );

  const onSearchAccessorsChange = (accessor: string) => {
    if (search.accessors.includes(accessor)) {
      setSearch({
        ...search,
        accessors: search.accessors.filter((a) => a !== accessor),
      });
    } else {
      setSearch({
        ...search,
        accessors: [...search.accessors, accessor],
      });
    }
  };

  return (
    <Popover position="bottom-end" shadow="md" width="max-content" withArrow>
      <Popover.Target>
        <Indicator
          color="transparent"
          disabled={countSearches <= 0}
          label={
            <Badge circle size="xs" variant="outline">
              {countSearches}
            </Badge>
          }
        >
          <ActionIcon size="lg" variant="default">
            <IconSearch size={16} />
          </ActionIcon>
        </Indicator>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack>
          {searchableColumns.map((column) => (
            <Checkbox
              checked={search.accessors.includes(column.accessor.toString())}
              key={column.accessor.toString()}
              label={column.title?.toString() ?? ""}
              labelPosition="left"
              onChange={() =>
                onSearchAccessorsChange(column.accessor.toString())
              }
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

type TDataTableSearchProps<T = Record<string, unknown>> = {
  prefixQueryKey?: string;
  columns: ExtendedDataTableColumnProps<T>[];
  i18n?: i18nDataTableSearchOptions;
  debounceTimeout?: number;
};

const defaultI18n: i18nDataTableSearchOptions = {
  search: "Search",
};

export function DataTableSearch<T = Record<string, unknown>>({
  prefixQueryKey,
  columns,
  i18n = defaultI18n,
  debounceTimeout = 300,
}: TDataTableSearchProps<T>) {
  // Call useState FIRST
  const [searchValue, setSearchValue] = useState("");

  // Use ref to store the search value so we can access it in useEffect
  const searchValueRef = useRef("");
  searchValueRef.current = searchValue;

  // Call useEffect BEFORE useDataTableQueryParams to ensure consistent hook order
  // This effect will be a no-op initially, but ensures useEffect is always called
  useEffect(() => {
    // This will be populated after useDataTableQueryParams is called
  }, []);

  // Then call useDataTableQueryParams (which internally calls useQueryState/useId)
  const { search, setSearch } = useDataTableQueryParams({
    prefixQueryKey,
  });

  // Sync searchValue with search.value when it changes externally
  useEffect(() => {
    if (searchValueRef.current !== search.value) {
      setSearchValue(search.value);
    }
  }, [search.value]);

  const debouncedSetSearchValue = useDebouncedCallback(
    (value: string) => setSearch({ ...search, value }),
    debounceTimeout
  );

  const onSearchValueChange = (value: string) => {
    setSearchValue(value);
    debouncedSetSearchValue(value);
  };

  return (
    <Group gap="xs">
      <DataTableSearchAccessorsToggle
        columns={columns}
        prefixQueryKey={prefixQueryKey}
      />
      <TextInput
        onChange={(e) => onSearchValueChange(e.target.value)}
        placeholder={i18n.search}
        rightSection={
          searchValue.length > 0 && (
            <CloseButton
              onClick={() => onSearchValueChange("")}
              size="sm"
              variant="transparent"
            />
          )
        }
        value={searchValue}
        w="200px"
      />
    </Group>
  );
}
