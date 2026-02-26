"use client";

import { Badge, Group, HoverCard } from "@mantine/core";
import { ETodoStatus } from "@repo/shared/enums/todo.enum";
import {
  type DataTableExtendedColumnProps,
  DataTableProvider,
  type DataTableProviderProps,
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
  DataTableProviderProps<Task>,
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
      case ETodoStatus.COMPLETED:
        return { color: "green", label: "Completed" };
      case ETodoStatus.IN_PROGRESS:
        return { color: "blue", label: "In Progress" };
      case ETodoStatus.PENDING:
        return { color: "yellow", label: "Pending" };
      default:
        return { color: "gray", label: "Unknown" };
    }
  };

  const TagComponent = ({ record }: { record: Task }) => {
    if (record.tags?.length === 0) {
      return null;
    }
    const firstTag = record.tags?.[0];
    const anotherTags = record.tags?.slice(1);
    return (
      <Group gap="xs" wrap="nowrap">
        <Badge
          color="gray"
          key={`${record.id}-tag-${firstTag}`}
          size="sm"
          w="max-content"
        >
          {firstTag}
        </Badge>
        {anotherTags && anotherTags.length > 0 && (
          <HoverCard>
            <HoverCard.Target>
              <Badge color="gray" size="sm" w="max-content">
                +{anotherTags.length}
              </Badge>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Group gap="xs" wrap="nowrap">
                {anotherTags.map((tag) => (
                  <Badge
                    color="gray"
                    key={`${record.id}-tag-${tag}`}
                    size="sm"
                    w="max-content"
                  >
                    {tag}
                  </Badge>
                ))}
              </Group>
            </HoverCard.Dropdown>
          </HoverCard>
        )}
      </Group>
    );
  };

  const columns: DataTableExtendedColumnProps<Task>[] = [
    {
      accessor: "code",
      title: "Code",
      width: "0%",
      textAlign: "center",
    },
    {
      accessor: "tag",
      title: "Tag",
      width: "0%",
      textAlign: "left",
      render: (record) => {
        return <TagComponent record={record} />;
      },
    },
    {
      accessor: "title",
      title: "Title",
      textAlign: "left",
    },
    {
      accessor: "status",
      title: "Status",
      width: "0%",
      textAlign: "center",
      render: (record) => {
        const { color, label } = getStatusBadge(record.status);
        return (
          <Badge color={color} size="sm" w="max-content">
            {label}
          </Badge>
        );
      },
    },
    {
      accessor: "priority",
      title: "Priority",
      width: "0%",
      textAlign: "right",
    },
    {
      accessor: "estimatedHours",
      title: "Estimated Hours",
      width: "0%",
      textAlign: "right",
    },
    {
      accessor: "createdAt",
      title: "Created At",
      render: (record) => dateFormatter(record.createdAt, "PPP"),
      width: "0%",
      textAlign: "right",
      noWrap: true,
    },
    {
      accessor: "dueDate",
      title: "Due Date",
      render: (record) =>
        record.dueDate ? dateFormatter(record.dueDate, "PPP") : "-",
      width: "0%",
      textAlign: "right",
      noWrap: true,
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
