"use client";

import {
  ActionIcon,
  Button,
  Container,
  Group,
  Menu,
  useMantineTheme,
} from "@mantine/core";
import { IconBrandGithub, IconChevronDown } from "@tabler/icons-react";
import { Link } from "nextra-theme-docs";
import Logo from "../logo";
import ThemeSwitcher from "../theme-control/theme-switcher";

export function AppHeader() {
  const theme = useMantineTheme();
  const demos = [
    {
      label: "Full Demo",
      href: "/demo/full",
    },
    {
      label: "Basic Demo",
      href: "/demo/basic",
    },
  ];
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
          <Menu trigger="click-hover">
            <Menu.Target>
              <Button
                rightSection={<IconChevronDown size={16} />}
                variant="subtle"
              >
                Demos
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              {demos.map((demo) => (
                <Menu.Item
                  component={Link}
                  href={{ pathname: demo.href }}
                  key={demo.href}
                >
                  {demo.label}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
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
