"use client";

import {
  ActionIcon,
  Button,
  Container,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { Link } from "nextra-theme-docs";
import Logo from "../logo";
import ThemeSwitcher from "../theme-control/theme-switcher";

export function AppHeader() {
  const theme = useMantineTheme();
  return (
    <Group
      h="60px"
      justify="space-between"
      px="md"
      styles={{
        root: {
          borderBottom: `1px solid light-dark(${theme.colors.gray[2]}, ${theme.colors.gray[8]})`,
          boxShadow: theme.shadows.xs,
        },
      }}
    >
      <Container
        component={Group}
        size="1440"
        style={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <Group gap="xs">
          <Logo />
          <Button
            component={Link}
            href={{ pathname: "/demo" }}
            variant="subtle"
          >
            Full Demo
          </Button>
          <Button
            component={Link}
            href={{ pathname: "/docs" }}
            variant="subtle"
          >
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
      </Container>
    </Group>
  );
}
