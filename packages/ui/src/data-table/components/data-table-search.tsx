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
import { IconSearch } from "@tabler/icons-react";
import { useDataTableQueryParams } from "../hooks";
import { useDataTableContext } from "../provider";
import type { i18nDataTableSearchOptions } from "../types";

function DataTableSearchAccessorsToggle() {
  const { columns } = useDataTableContext();
  const { search, setSearch } = useDataTableQueryParams();
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
    <Popover shadow="md" width="max-content" withArrow>
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
          <ActionIcon size={36} variant="default">
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

type TDataTableSearchProps = {
  i18n?: i18nDataTableSearchOptions;
};

const defaultI18n: i18nDataTableSearchOptions = {
  search: "Search",
};

export function DataTableSearch({ i18n = defaultI18n }: TDataTableSearchProps) {
  const { search, setSearch } = useDataTableQueryParams();

  const onSearchValueChange = (value: string) => {
    setSearch({ ...search, value });
  };

  return (
    <Group gap="xs">
      <DataTableSearchAccessorsToggle />
      <TextInput
        onChange={(e) => onSearchValueChange(e.target.value)}
        placeholder={i18n.search}
        rightSection={
          search.value.length > 0 && (
            <CloseButton
              onClick={() => onSearchValueChange("")}
              size="sm"
              variant="transparent"
            />
          )
        }
        value={search.value}
        w="200px"
      />
    </Group>
  );
}
