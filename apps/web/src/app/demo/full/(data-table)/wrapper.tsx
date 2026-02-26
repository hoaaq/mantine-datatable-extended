"use client";

import { Badge, Group, HoverCard } from "@mantine/core";
import { ETodoStatus } from "@repo/shared/enums/todo.enum";
import {
  DteProvider,
  type TDteColumnProps,
  type TDteProviderProps,
} from "@repo/ui";
import { useDataTableColumns } from "mantine-datatable";
import { useDateFormatter } from "@/hooks/date-format";
import type { client } from "@/lib/treaty";
import { useFacets } from "./data";

export type Task = NonNullable<
  Awaited<ReturnType<(typeof client)["api"]["todo"]["task"]["get"]>>["data"]
>["data"]["items"][number];

type DataTableWrapperProps = {
  children: React.ReactNode;
} & Omit<
  TDteProviderProps<Task>,
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

  const { tagsFacet, isFetching: isFetchingTagsFacet } = useFacets();

  const columns: TDteColumnProps<Task>[] = [
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
      accessor: "tags",
      title: "Tags",
      draggable: true,
      toggleable: true,
      width: "0%",
      textAlign: "left",
      render: (record) => {
        return <TagComponent record={record} />;
      },
      extend: {
        searchable: true,
        sortable: true,
        filterable: true,
        filterVariant: "multi_select",
        filterOptions: {
          data: isFetchingTagsFacet
            ? []
            : tagsFacet.map((tag) => ({
                label: `${tag.value} (${tag.count})`,
                value: tag.value,
              })),
        },
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
            { label: "Pending", value: ETodoStatus.PENDING },
            { label: "Completed", value: ETodoStatus.COMPLETED },
            { label: "In Progress", value: ETodoStatus.IN_PROGRESS },
          ],
        },
      },
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
      draggable: true,
      toggleable: true,
      width: "0%",
      textAlign: "right",
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
      textAlign: "right",
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
      accessor: "createdAt",
      title: "Created At",
      render: (record) => dateFormatter(record.createdAt, "PPP"),
      draggable: true,
      toggleable: true,
      width: "0%",
      textAlign: "right",
      noWrap: true,
      extend: {
        sortable: true,
        filterable: true,
        filterVariant: "date",
      },
    },
    {
      accessor: "dueDate",
      title: "Due Date",
      render: (record) =>
        record.dueDate ? dateFormatter(record.dueDate, "PPP") : "-",
      draggable: true,
      toggleable: true,
      width: "0%",
      textAlign: "right",
      noWrap: true,
      extend: {
        sortable: true,
        filterable: true,
        filterVariant: "date_range",
      },
    },
  ];

  const originalUseDataTableColumnsResult = useDataTableColumns({
    key: props.storeColumnsKey,
    columns,
  });

  return (
    <DteProvider
      {...props}
      columns={columns}
      originalUseDataTableColumnsResult={originalUseDataTableColumnsResult}
    >
      {children}
    </DteProvider>
  );
}
