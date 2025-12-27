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
    <Popover shadow="md" width="450px" withArrow>
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
            color="dark"
            disabled={remainingColumns.length === 0}
            leftSection={<IconPlus size={16} />}
            onClick={onAddSort}
            size="sm"
            variant="filled"
          >
            {i18n.addSort}
          </Button>
          <Button
            leftSection={<IconRefresh size={16} />}
            onClick={onResetSort}
            size="sm"
            variant="default"
          >
            {i18n.resetSort}
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}
