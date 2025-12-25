import { Text } from "@mantine/core";
import { useDataTableColumnsExtend } from "@repo/ui/data-table/hooks";
import type { ExtendedDataTableColumnProps } from "@repo/ui/data-table/types";
import type { Task } from "@/asset/types";
import { useDateFormatter } from "@/hooks/date-format";

export function useColumns() {
  const dateFormatter = useDateFormatter();

  const columns: ExtendedDataTableColumnProps<Task>[] = [
    {
      accessor: "title",
      title: "Title",
      render: (record) => <Text>{record.title}</Text>,
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
