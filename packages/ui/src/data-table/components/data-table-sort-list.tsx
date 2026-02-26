import { DragDropProvider } from "@dnd-kit/react";
import { isSortable, useSortable } from "@dnd-kit/react/sortable";
import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Popover,
  Select,
  Space,
  Stack,
} from "@mantine/core";
import {
  IconArrowsSort,
  IconGripHorizontal,
  IconPlus,
  IconRefresh,
  IconTrash,
} from "@tabler/icons-react";
import type React from "react";
import { useDataTableQueryParams } from "../hooks";
import { useDataTableContext } from "../provider";
import { ESortDirection, type i18nDataTableSortOptions } from "../types";

type TDataTableSortListProps = {
  i18n?: i18nDataTableSortOptions;
};

const defaultI18n: i18nDataTableSortOptions = {
  sort: "Sort",
  addSort: "Add Sort",
  resetSort: "Reset Sort",
  asc: "Asc",
  desc: "Desc",
};

type SortableSortRowProps = {
  sort: { accessor: string; direction: ESortDirection };
  index: number;
  sortableColumns: { accessor: string; title?: React.ReactNode }[];
  i18n: i18nDataTableSortOptions;
  onAccessorChange: (prevAccessor: string, newAccessor: string | null) => void;
  onDirectionChange: (accessor: string, direction: string | null) => void;
  onRemoveSort: (accessor: string) => void;
};

function SortableSortRow({
  sort,
  index,
  sortableColumns,
  i18n,
  onAccessorChange,
  onDirectionChange,
  onRemoveSort,
}: SortableSortRowProps) {
  const { ref, handleRef } = useSortable({
    id: sort.accessor,
    index,
  });

  return (
    <Group align="center" gap="xs" ref={ref} wrap="nowrap">
      <Select
        checkIconPosition="right"
        comboboxProps={{ withinPortal: false }}
        data={sortableColumns.map((column) => ({
          label: column.title?.toString() ?? "",
          value: column.accessor as string,
        }))}
        onChange={(value) => onAccessorChange(sort.accessor, value)}
        searchable
        size="xs"
        value={sort.accessor}
      />
      <Select
        checkIconPosition="right"
        comboboxProps={{ withinPortal: false }}
        data={Object.values(ESortDirection).map((direction) => ({
          label: i18n[direction] ?? "",
          value: direction,
        }))}
        onChange={(value) => onDirectionChange(sort.accessor, value)}
        size="xs"
        value={sort.direction}
      />
      <ActionIcon
        aria-label="Remove sort"
        onClick={() => onRemoveSort(sort.accessor)}
        size="md"
        variant="default"
      >
        <IconTrash size={16} />
      </ActionIcon>
      <ActionIcon
        aria-label="Drag to reorder"
        ref={handleRef}
        size="md"
        style={{ cursor: "grab", flexShrink: 0 }}
        variant="default"
      >
        <IconGripHorizontal size={16} />
      </ActionIcon>
    </Group>
  );
}

export function DataTableSortList({
  i18n = defaultI18n,
}: TDataTableSortListProps) {
  const { sorts, setSorts, resetSorts } = useDataTableQueryParams();
  const { columns } = useDataTableContext();

  const sortableColumns = columns.filter((column) => column.extend?.sortable);
  const remainingColumns = sortableColumns.filter(
    (column) => !sorts.some((sort) => sort.accessor === column.accessor)
  );
  const countSorts = sorts.length;

  const onAddSort = () => {
    if (remainingColumns.length > 0 && remainingColumns[0]) {
      const newSort = {
        accessor: remainingColumns[0].accessor as string,
        direction: ESortDirection.ASC,
      };
      setSorts([...sorts, newSort]);
    }
  };

  const onResetSort = () => {
    resetSorts();
  };

  const onRemoveSort = (accessor: string) => {
    setSorts(sorts.filter((sort) => sort.accessor !== accessor));
  };

  const onAccessorChange = (
    prevAccessor: string,
    newAccessor: string | null
  ) => {
    if (newAccessor === null) {
      return;
    }
    const newSorts = sorts.filter(
      (sort) => sort.accessor !== prevAccessor && sort.accessor !== newAccessor
    );
    setSorts([
      ...newSorts,
      {
        accessor: newAccessor,
        direction:
          sorts.find((sort) => sort.accessor === prevAccessor)?.direction ||
          ESortDirection.ASC,
      },
    ]);
  };

  const onDirectionChange = (accessor: string, direction: string | null) => {
    if (direction === null) {
      return;
    }
    setSorts(
      sorts.map((sort) =>
        sort.accessor === accessor
          ? { ...sort, direction: direction as ESortDirection }
          : sort
      )
    );
  };

  const onDragEnd: React.ComponentProps<typeof DragDropProvider>["onDragEnd"] =
    (event) => {
      if (event.canceled) {
        return;
      }

      const { source } = event.operation;

      if (source && isSortable(source)) {
        const { initialIndex, index } = source;

        if (initialIndex !== index) {
          setSorts((prevSorts) => {
            const newSorts = [...prevSorts];
            const [removed] = newSorts.splice(initialIndex, 1);
            if (removed) {
              newSorts.splice(index, 0, removed);
            }
            return newSorts;
          });
        }
      }
    };

  return (
    <Popover shadow="md" width="450px" withArrow>
      <Popover.Target>
        <Button
          leftSection={<IconArrowsSort size={16} />}
          rightSection={
            <Badge circle variant="outline">
              {countSorts}
            </Badge>
          }
          variant="default"
        >
          {i18n.sort}
        </Button>
      </Popover.Target>
      <Popover.Dropdown p="sm">
        <DragDropProvider onDragEnd={onDragEnd}>
          <Stack gap="xs">
            {sorts.map((sort, index) => (
              <SortableSortRow
                i18n={i18n}
                index={index}
                key={sort.accessor}
                onAccessorChange={onAccessorChange}
                onDirectionChange={onDirectionChange}
                onRemoveSort={onRemoveSort}
                sort={sort}
                sortableColumns={sortableColumns}
              />
            ))}
          </Stack>
        </DragDropProvider>
        <Space h="sm" />
        <Group>
          <Button
            color="dark"
            disabled={remainingColumns.length === 0}
            leftSection={<IconPlus size={16} />}
            onClick={onAddSort}
            size="xs"
            variant="filled"
          >
            {i18n.addSort}
          </Button>
          <Button
            leftSection={<IconRefresh size={16} />}
            onClick={onResetSort}
            size="xs"
            variant="default"
          >
            {i18n.resetSort}
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}
