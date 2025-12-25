import { Divider, Group, Skeleton, Space } from "@mantine/core";

export function DataTableSkeleton() {
  return (
    <>
      <Group justify="space-between">
        <Group>
          <Skeleton height={36} width={36} />
          <Skeleton height={36} width={250} />
          <Skeleton height={36} width={108} />
          <Skeleton height={36} width={108} />
        </Group>
        <Group>
          <Skeleton height={36} width={108} />
          <Skeleton height={36} width={108} />
        </Group>
      </Group>
      <Space h="md" />
      <Skeleton height={40} radius={0} />
      <Divider color="gray.7" />
      <Skeleton height={400} radius={0} />
      <Divider color="gray.7" />
      <Skeleton height={48} radius={0} />
    </>
  );
}
