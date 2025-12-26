"use client";

import {
  ActionIcon,
  Anchor,
  AppShell,
  Button,
  Flex,
  Group,
  Text,
} from "@mantine/core";
import { IconBrandGithub, IconHome } from "@tabler/icons-react";
import Link from "next/link";
import ThemeSwitcher from "./theme-control/theme-switcher";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AppShell footer={{ height: 60 }} header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" justify="space-between" px="md">
          <Group>
            <Button
              component={Link}
              href="/"
              leftSection={<IconHome size={20} />}
              variant="subtle"
              visibleFrom="sm"
            >
              Mantine DataTable Extended
            </Button>
            <Button
              component={Link}
              hiddenFrom="sm"
              href="/"
              leftSection={<IconHome size={20} />}
              variant="subtle"
            >
              MDE
            </Button>
            <Button component={Link} href="/" variant="subtle">
              Docs
            </Button>
          </Group>
          <Group>
            <ActionIcon
              color="gray"
              component={Link}
              href="https://github.com/hoaaq/mantine-datatable-extended"
              target="_blank"
              variant="subtle"
            >
              <IconBrandGithub size={18} />
            </ActionIcon>
            <ThemeSwitcher />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer p="md">
        <Flex align="center" h="100%" justify="center">
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
        </Flex>
      </AppShell.Footer>
    </AppShell>
  );
}
