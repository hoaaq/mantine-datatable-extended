import {
  ActionIcon,
  Badge,
  Checkbox,
  CloseButton,
  Divider,
  Group,
  Indicator,
  Popover,
  ScrollArea,
  Stack,
  TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useDteQueryParams } from "../hooks";
import { useDteContext } from "../provider";

function DteSearchAccessorsToggle() {
  const { columns, i18n } = useDteContext();
  const { search, setSearch } = useDteQueryParams();
  const countSearches = search.accessors.length;
  const [filter, setFilter] = useState("");

  const searchableColumns = useMemo(
    () => columns.filter((column) => column.extend?.searchable),
    [columns]
  );

  const filteredColumns = useMemo(() => {
    if (!filter.trim()) {
      return searchableColumns;
    }
    const query = filter.toLowerCase().trim();
    return searchableColumns.filter((column) => {
      const title = column.title?.toString() ?? "";
      return title.toLowerCase().includes(query);
    });
  }, [searchableColumns, filter]);

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
      <Popover.Dropdown p="0">
        <TextInput
          autoFocus
          leftSection={<IconSearch size={16} />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilter(e.target.value)
          }
          p="4"
          placeholder={i18n.search.searchAccessorsSearchPlaceholder}
          styles={{
            input: {
              border: "none",
            },
          }}
          value={filter}
        />
        <Divider />
        <ScrollArea.Autosize mah={180} type="auto">
          <Stack gap="0">
            {filteredColumns.map((column) => (
              <Checkbox
                checked={search.accessors.includes(column.accessor.toString())}
                classNames={{
                  root: "mantine-dte-checkbox-root",
                  body: "mantine-dte-checkbox-body",
                  labelWrapper: "mantine-dte-checkbox-label-wrapper",
                  label: "mantine-dte-checkbox-label",
                  input: "mantine-dte-checkbox-input",
                  icon: "mantine-dte-checkbox-icon",
                }}
                key={column.accessor.toString()}
                label={column.title?.toString() ?? ""}
                labelPosition="left"
                onChange={() =>
                  onSearchAccessorsChange(column.accessor.toString())
                }
                size="xs"
                variant="outline"
              />
            ))}
          </Stack>
        </ScrollArea.Autosize>
      </Popover.Dropdown>
    </Popover>
  );
}

export function DteSearch() {
  const { search, setSearch } = useDteQueryParams();
  const { i18n } = useDteContext();

  const onSearchValueChange = (value: string) => {
    setSearch({ ...search, value });
  };

  return (
    <Group gap="xs">
      <DteSearchAccessorsToggle />
      <TextInput
        onChange={(e) => onSearchValueChange(e.target.value)}
        placeholder={i18n.search.search}
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
