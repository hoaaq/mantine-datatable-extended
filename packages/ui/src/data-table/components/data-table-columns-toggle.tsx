import { Button, Checkbox, Popover, Stack } from "@mantine/core";
import { IconColumns } from "@tabler/icons-react";
import type { DataTableColumnToggle } from "mantine-datatable";
import { useDataTableColumnsExtend } from "../hooks";
import type {
  ExtendedDataTableColumnProps,
  i18nDataTableViewOptions,
} from "../types";

type TDataTableColumnsToggleProps<T = Record<string, unknown>> = {
  columnStoreKey: string;
  columns: ExtendedDataTableColumnProps<T>[];
  i18n?: i18nDataTableViewOptions;
};

const defaultI18n: i18nDataTableViewOptions = {
  columnsToggle: "Columns Toggle",
};

export function DataTableColumnsToggle<T = Record<string, unknown>>({
  columnStoreKey,
  columns,
  i18n = defaultI18n,
}: TDataTableColumnsToggleProps<T>) {
  const { effectiveColumns, columnsToggle, setColumnsToggle } =
    useDataTableColumnsExtend({
      key: columnStoreKey,
      columns,
    });

  const onToggleChange = (column: DataTableColumnToggle) => {
    setColumnsToggle(
      columnsToggle.map((c) =>
        c.accessor === column.accessor ? { ...c, toggled: !c.toggled } : c
      )
    );
  };

  return (
    <Popover position="bottom-end" shadow="md" width="target" withArrow>
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
