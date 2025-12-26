import { Divider, Skeleton } from "@mantine/core";

export function DataTableSkeleton() {
  return (
    <>
      <Skeleton height={40} radius={0} />
      <Divider color="gray.7" />
      <Skeleton height={400} radius={0} />
      <Divider color="gray.7" />
      <Skeleton height={48} radius={0} />
    </>
  );
}
