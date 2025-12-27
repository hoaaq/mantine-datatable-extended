import { Button, Checkbox, Popover, Stack } from "@mantine/core";
import { IconColumns } from "@tabler/icons-react";
import type { DataTableColumnToggle } from "mantine-datatable";
import { useDataTableContext } from "../provider";
import type { i18nDataTableViewOptions } from "../types";

type TDataTableColumnsToggleProps = {
  i18n?: i18nDataTableViewOptions;
};

const defaultI18n: i18nDataTableViewOptions = {
  columnsToggle: "Columns Toggle",
};

export function DataTableColumnsToggle({
  i18n = defaultI18n,
}: TDataTableColumnsToggleProps) {
  const { originalUseDataTableColumnsResult } = useDataTableContext();
  const { effectiveColumns, columnsToggle, setColumnsToggle } =
    originalUseDataTableColumnsResult;

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
        <Button leftSection={<IconColumns />} variant="default">
          {i18n.columnsToggle}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack>
          {columnsToggle
            .filter((column) => column.toggleable)
            .map((column) => (
              <Checkbox
                checked={column.toggled}
                key={column.accessor}
                label={
                  effectiveColumns
                    .find((c) => c.accessor === column.accessor)
                    ?.title?.toString() ?? ""
                }
                labelPosition="left"
                onChange={() => onToggleChange(column)}
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
