import { Text } from "@mantine/core";
import {
  type ExtendedDataTableColumnProps,
  useDataTableColumnsExtend,
} from "@repo/ui";
import { useDateFormatter } from "@/hooks/date-format";
import type { client } from "@/lib/treaty";

export type Task = NonNullable<
  Awaited<ReturnType<(typeof client)["api"]["todo"]["task"]["get"]>>["data"]
>["data"]["items"][number];

export function useColumns() {
  const dateFormatter = useDateFormatter();

  const columns: ExtendedDataTableColumnProps<Task>[] = [
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
  ];

  const columnStoreKey = "todo-task-columns";
  const { effectiveColumns } = useDataTableColumnsExtend({
    key: columnStoreKey,
    columns,
  });

  return {
    columnStoreKey,
    effectiveColumns,
  };
}
