import { Container, Space } from "@mantine/core";
import { DataTable } from "./(data-table)/table";

export default function Home() {
  return (
    <Container size="xl">
      <Space h="xl" />
      <DataTable />
    </Container>
  );
}
