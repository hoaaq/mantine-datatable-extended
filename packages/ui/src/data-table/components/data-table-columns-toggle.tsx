import {
  Button,
  Checkbox,
  Divider,
  Popover,
  ScrollArea,
  Stack,
  TextInput,
} from "@mantine/core";
import { IconAdjustmentsHorizontal, IconSearch } from "@tabler/icons-react";
import type { DataTableColumnToggle } from "mantine-datatable";
import { useMemo, useState } from "react";
import { useDataTableContext } from "../provider";
import type { i18nDataTableViewOptions } from "../types";

type TDataTableColumnsToggleProps = {
  i18n?: i18nDataTableViewOptions;
};

const defaultI18n: i18nDataTableViewOptions = {
  columnsToggle: "Columns Toggle",
  columnsToggleSearchPlaceholder: "Search columns…",
};

export function DataTableColumnsToggle({
  i18n = defaultI18n,
}: TDataTableColumnsToggleProps) {
  const { originalUseDataTableColumnsResult } = useDataTableContext();
  const { effectiveColumns, columnsToggle, setColumnsToggle } =
    originalUseDataTableColumnsResult;
  const [search, setSearch] = useState("");

  const toggleableColumns = useMemo(
    () => columnsToggle.filter((column) => column.toggleable),
    [columnsToggle]
  );

  const filteredColumns = useMemo(() => {
    if (!search.trim()) {
      return toggleableColumns;
    }
    const query = search.toLowerCase().trim();
    return toggleableColumns.filter((column) => {
      const title =
        effectiveColumns
          .find((c) => c.accessor === column.accessor)
          ?.title?.toString() ?? "";
      return title.toLowerCase().includes(query);
    });
  }, [toggleableColumns, effectiveColumns, search]);

  const onToggleChange = (column: DataTableColumnToggle) => {
    setColumnsToggle(
      columnsToggle.map((c) =>
        c.accessor === column.accessor ? { ...c, toggled: !c.toggled } : c
      )
    );
  };

  return (
    <Popover shadow="md" width="max-content" withArrow>
      <Popover.Target>
        <Button
          leftSection={<IconAdjustmentsHorizontal size={16} />}
          variant="default"
        >
          {i18n.columnsToggle}
        </Button>
      </Popover.Target>
      <Popover.Dropdown p="0">
        <TextInput
          autoFocus
          leftSection={<IconSearch size={16} />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          p="4"
          placeholder={i18n.columnsToggleSearchPlaceholder}
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
            {filteredColumns.map((column) => (
              <Checkbox
                checked={column.toggled}
                classNames={{
                  root: "mantine-dte-checkbox-root",
                  body: "mantine-dte-checkbox-body",
                  labelWrapper: "mantine-dte-checkbox-label-wrapper",
                  label: "mantine-dte-checkbox-label",
                  input: "mantine-dte-checkbox-input",
                }}
                key={column.accessor}
                label={
                  effectiveColumns
                    .find((c) => c.accessor === column.accessor)
                    ?.title?.toString() ?? ""
                }
                labelPosition="left"
                onChange={() => onToggleChange(column)}
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
