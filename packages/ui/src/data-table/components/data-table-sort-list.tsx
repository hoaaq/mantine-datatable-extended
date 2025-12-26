import {
  ActionIcon,
  Badge,
  Button,
  Grid,
  Group,
  Popover,
  Select,
  Space,
} from "@mantine/core";
import {
  IconPlus,
  IconRefresh,
  IconSort09,
  IconTrash,
} from "@tabler/icons-react";
import React from "react";
import { useDataTableQueryParams } from "../hooks";
import {
  ESortDirection,
  type ExtendedDataTableColumnProps,
  type i18nDataTableSortOptions,
  type TSortCondition,
} from "../types";

type TDataTableSortListProps<T = Record<string, unknown>> = {
  prefixQueryKey?: string;
  columns: ExtendedDataTableColumnProps<T>[];
  i18n?: i18nDataTableSortOptions;
  defaultSorts?: TSortCondition[];
};

const defaultI18n: i18nDataTableSortOptions = {
  sort: "Sort",
  addSort: "Add Sort",
  resetSort: "Reset Sort",
  asc: "Asc",
  desc: "Desc",
};

export function DataTableSortList<T = Record<string, unknown>>({
  prefixQueryKey,
  columns,
  i18n = defaultI18n,
  defaultSorts = [],
}: TDataTableSortListProps<T>) {
  const { sorts, setSorts } = useDataTableQueryParams({
    prefixQueryKey,
    defaultSorts,
  });

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
    setSorts(defaultSorts);
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
    // remove prev and new if duplicate
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

  return (
    <Popover position="bottom-end" shadow="md" width="450" withArrow>
      <Popover.Target>
        <Button
          leftSection={<IconSort09 />}
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
      <Popover.Dropdown>
        <Grid>
          {sorts.map((sort) => (
            <React.Fragment key={sort.accessor}>
              <Grid.Col span={6}>
                <Select
                  comboboxProps={{ withinPortal: false }}
                  data={sortableColumns.map((column) => ({
                    label: column.title?.toString() ?? "",
                    value: column.accessor as string,
                  }))}
                  onChange={(value) => onAccessorChange(sort.accessor, value)}
                  value={sort.accessor}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  comboboxProps={{ withinPortal: false }}
                  data={Object.values(ESortDirection).map((direction) => ({
                    label: i18n[direction] ?? "",
                    value: direction,
                  }))}
                  onChange={(value) => onDirectionChange(sort.accessor, value)}
                  value={sort.direction}
                />
              </Grid.Col>
              <Grid.Col
                span={1}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActionIcon
                  onClick={() => onRemoveSort(sort.accessor)}
                  size="lg"
                  variant="default"
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Grid.Col>
            </React.Fragment>
          ))}
        </Grid>
        <Space h="md" />
        <Group>
          <Button
            color="gray"
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
