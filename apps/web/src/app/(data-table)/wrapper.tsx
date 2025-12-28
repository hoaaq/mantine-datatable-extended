"use client";

import { Badge } from "@mantine/core";
import {
  type DataTableContextProps,
  type DataTableExtendedColumnProps,
  DataTableProvider,
} from "@repo/ui";
import { useDataTableColumns } from "mantine-datatable";
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

  const getStatusBadge = (
    status: Task["status"]
  ): { color: string; label: string } => {
    switch (status) {
      case "completed":
        return { color: "green", label: "Completed" };
      case "in_progress":
        return { color: "blue", label: "In Progress" };
      default:
        return { color: "yellow", label: "Pending" };
    }
  };

  const columns: DataTableExtendedColumnProps<Task>[] = [
    {
      accessor: "code",
      title: "Code",
      draggable: true,
      toggleable: true,
      width: "0%",
      textAlign: "center",
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
      draggable: true,
      toggleable: true,
      width: "0%",
      textAlign: "center",
      extend: {
        sortable: true,
        filterable: true,
        filterVariant: "number",
      },
    },
    {
      accessor: "estimatedHours",
      title: "Estimated Hours",
      draggable: true,
      toggleable: true,
      width: "0%",
      textAlign: "center",
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
      width: "0%",
      textAlign: "center",
      extend: {
        sortable: true,
        filterable: true,
        filterVariant: "date_range",
      },
    },
    {
      accessor: "status",
      title: "Status",
      draggable: true,
      toggleable: true,
      width: "0%",
      textAlign: "center",
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
      render: (record) => {
        const { color, label } = getStatusBadge(record.status);
        return (
          <Badge color={color} size="sm">
            {label}
          </Badge>
        );
      },
    },
    {
      accessor: "createdAt",
      title: "Created At",
      render: (record) => dateFormatter(record.createdAt, "dd/MM/yyyy"),
      draggable: true,
      toggleable: true,
      width: "0%",
      textAlign: "center",
      extend: {
        sortable: true,
        filterable: true,
        filterVariant: "date",
      },
    },
  ];

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
