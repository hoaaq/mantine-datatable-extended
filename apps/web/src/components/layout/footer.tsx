"use client";

import { Anchor, Container, Group, Text, useMantineTheme } from "@mantine/core";

export function AppFooter() {
  const theme = useMantineTheme();
  return (
    <Group
      align="center"
      h="60px"
      justify="center"
      styles={{
        root: {
          borderTop: `1px solid light-dark(${theme.colors.gray[2]}, ${theme.colors.gray[8]})`,
        },
      }}
    >
      <Container size="1440">
        <Text size="sm" ta="center">
          Made by{" "}
          <Anchor href="https://hoaaq.dev" target="_blank">
            Au Quoc Hoa
          </Anchor>{" "}
          based on this awesome library{" "}
          <Anchor
            href="https://icflorescu.github.io/mantine-datatable/"
            target="_blank"
          >
            Mantine DataTable
          </Anchor>
        </Text>
      </Container>
    </Group>
  );
}
