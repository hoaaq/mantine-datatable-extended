"use client";

import { Text } from "@mantine/core";
import {
  type DataTableContextProps,
  type DataTableExtendedColumnProps,
  DataTableProvider,
} from "@repo/ui";
import { useDataTableColumns } from "mantine-datatable";
import { useMemo } from "react";
import { useDateFormatter } from "@/hooks/date-format";
import type { client } from "@/lib/treaty";

export type Task = NonNullable<
  Awaited<ReturnType<(typeof client)["api"]["todo"]["task"]["get"]>>["data"]
>["data"]["items"][number];

type DataTableWrapperProps = {
  children: React.ReactNode;
} & Omit<
  DataTableContextProps<Task>,
  "columns" | "originalUseDataTableColumnsResult"
>;

export function DataTableWrapper({
  children,
  ...props
}: DataTableWrapperProps) {
  const dateFormatter = useDateFormatter();

  const columns: DataTableExtendedColumnProps<Task>[] = useMemo(
    () => [
      {
        accessor: "code",
        title: "Code",
        render: (record) => <Text>{record.code}</Text>,
        draggable: true,
        toggleable: true,
        extend: {
          searchable: true,
          sortable: true,
          filterable: true,
          filterVariant: "text",
        },
      },
      {
        accessor: "title",
        title: "Title",
        render: (record) => <Text>{record.title}</Text>,
        draggable: true,
        toggleable: true,
        extend: {
          searchable: true,
          sortable: true,
          filterable: true,
          filterVariant: "text",
        },
      },
      {
        accessor: "priority",
        title: "Priority",
        render: (record) => <Text>{record.priority}</Text>,
        draggable: true,
        toggleable: true,
        extend: {
          sortable: true,
          filterable: true,
          filterVariant: "number",
        },
      },
      {
        accessor: "estimatedHours",
        title: "Estimated Hours",
        render: (record) => <Text>{record.estimatedHours}</Text>,
        draggable: true,
        toggleable: true,
        extend: {
          sortable: true,
          filterable: true,
          filterVariant: "number_range",
          filterOptions: {
            min: 1,
            max: 24,
            step: 1,
            minRange: 1,
          },
        },
      },
      {
        accessor: "dueDate",
        title: "Due Date",
        render: (record) =>
          record.dueDate ? dateFormatter(record.dueDate, "dd/MM/yyyy") : "-",
        draggable: true,
        toggleable: true,
        extend: {
          sortable: true,
          filterable: true,
          filterVariant: "date_range",
        },
      },
      {
        accessor: "status",
        title: "Status",
        width: "0%",
        render: (record) => <Text>{record.status}</Text>,
        draggable: true,
        toggleable: true,
        extend: {
          sortable: true,
          filterable: true,
          filterVariant: "single_select",
          filterOptions: {
            data: [
              { label: "Pending", value: "pending" },
              { label: "Completed", value: "completed" },
              { label: "In Progress", value: "in_progress" },
            ],
          },
        },
      },
      {
        accessor: "createdAt",
        title: "Created At",
        render: (record) => dateFormatter(record.createdAt, "dd/MM/yyyy"),
        draggable: true,
        toggleable: true,
        extend: {
          sortable: true,
          filterable: true,
          filterVariant: "date",
        },
      },
    ],
    [dateFormatter]
  );

  const originalUseDataTableColumnsResult = useDataTableColumns({
    key: props.storeColumnsKey,
    columns,
  });

  return (
    <DataTableProvider
      {...props}
      columns={columns}
      originalUseDataTableColumnsResult={originalUseDataTableColumnsResult}
    >
      {children}
    </DataTableProvider>
  );
}
