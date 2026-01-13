"use client";

import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconBrandGithub,
  IconCode,
  IconFilter,
  IconLink,
  IconSearch,
  IconSortAscending,
  IconTable,
  IconToggleLeft,
} from "@tabler/icons-react";
import Link from "next/link";

const features = [
  {
    icon: IconSearch,
    title: "Advanced Search",
    description: "Multi-column search with intelligent filtering capabilities",
    color: "blue",
  },
  {
    icon: IconFilter,
    title: "Powerful Filters",
    description: "Text, number, date, select, and range filters out of the box",
    color: "cyan",
  },
  {
    icon: IconSortAscending,
    title: "Multi-Column Sorting",
    description: "Sort by multiple columns simultaneously",
    color: "indigo",
  },
  {
    icon: IconToggleLeft,
    title: "Column Toggle",
    description: "Show or hide columns with a dedicated component",
    color: "violet",
  },
  {
    icon: IconLink,
    title: "URL State Management",
    description: "Shareable URLs with filters, search, and sort preserved",
    color: "grape",
  },
  {
    icon: IconCode,
    title: "Server-Side Ready",
    description: "Built-in Next.js App Router support with SSR capabilities",
    color: "pink",
  },
];

export default function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        p={{ base: "xl", sm: "xl", md: 60 }}
        style={{
          background:
            "linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)",
          borderRadius: "var(--mantine-radius-lg)",
          marginBottom: "var(--mantine-spacing-xl)",
        }}
      >
        <Container size="lg">
          <Stack align="center" gap="xl" py={{ base: 32, sm: 48, md: 64 }}>
            <Box style={{ textAlign: "center", maxWidth: 900, width: "100%" }}>
              <Title
                fw={800}
                mb={{ base: "lg", sm: "lg", md: "xl" }}
                order={1}
                size="h1"
                style={{
                  background:
                    "linear-gradient(135deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-cyan-6) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Mantine DataTable Extended
              </Title>
              <Text
                c="dimmed"
                fw={400}
                mb="xl"
                size="md"
                style={{ lineHeight: 1.7 }}
              >
                Supercharge your data tables with powerful search, filtering,
                sorting, and URL state management. Built on top of the excellent
                Mantine DataTable with opinionated, production-ready components.
              </Text>
              <Group gap="md" justify="center" wrap="wrap">
                <Button
                  component={Link}
                  href={{ pathname: "/demo" }}
                  radius="md"
                  size="lg"
                  variant="filled"
                >
                  View Demo
                </Button>
                <Button
                  component={Link}
                  href={{ pathname: "/docs" }}
                  radius="md"
                  size="lg"
                  variant="light"
                >
                  Documentation
                </Button>
                <Button
                  component={Link}
                  href={{
                    pathname:
                      "https://github.com/hoaaq/mantine-datatable-extended",
                  }}
                  leftSection={<IconBrandGithub size={20} />}
                  radius="md"
                  size="lg"
                  variant="subtle"
                >
                  GitHub
                </Button>
              </Group>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container size="lg">
        {/* Features Section */}
        <Box mb={{ base: "xl", sm: 60 }}>
          <Title
            fw={700}
            mb={{ base: "xl", sm: "xl", md: 48 }}
            order={2}
            size="h2"
            ta="center"
          >
            Powerful Features
          </Title>
          <Grid gutter={{ base: "md", sm: "lg" }}>
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Grid.Col key={feature.title} span={{ base: 12, sm: 6, md: 4 }}>
                  <Card
                    h="100%"
                    padding="xl"
                    radius="md"
                    shadow="xs"
                    style={{
                      transition: "all 0.2s ease",
                      border: "1px solid var(--mantine-color-default-border)",
                    }}
                    styles={{
                      root: {
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "var(--mantine-shadow-md)",
                          borderColor: "var(--mantine-color-blue-4)",
                        },
                      },
                    }}
                  >
                    <Stack gap="sm">
                      <ThemeIcon
                        color={feature.color}
                        radius="md"
                        size={64}
                        variant="light"
                      >
                        <Icon size={32} />
                      </ThemeIcon>
                      <Title fw={600} order={3} size="h3">
                        {feature.title}
                      </Title>
                      <Text c="dimmed" size="md" style={{ lineHeight: 1.65 }}>
                        {feature.description}
                      </Text>
                    </Stack>
                  </Card>
                </Grid.Col>
              );
            })}
          </Grid>
        </Box>

        {/* Why This Library Section */}
        <Box mb={{ base: "xl", sm: 60 }}>
          <Card p="xl" radius="md" shadow="xs">
            <Stack gap="xl">
              <Group gap="md">
                <ThemeIcon color="blue" radius="md" size={48} variant="light">
                  <IconTable size={28} />
                </ThemeIcon>
                <Title fw={700} order={2} size="h2">
                  Why Mantine DataTable Extended?
                </Title>
              </Group>
              <Text c="dimmed" fw={400} size="md" style={{ lineHeight: 1.75 }}>
                Mantine and Mantine DataTable are excellent libraries, but they
                come with some limitations when building complex data tables.
                This library extends them with:
              </Text>
              <Grid gutter="lg" mt="xs">
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Group align="flex-start" gap="md" wrap="nowrap">
                    <Text c="blue" fw={700} size="md">
                      ✓
                    </Text>
                    <Text fw={400} size="md" style={{ lineHeight: 1.7 }}>
                      <strong>Standardized Components</strong> - Ready-to-use
                      search, filter, sort, and column toggle components
                    </Text>
                  </Group>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Group align="flex-start" gap="md" wrap="nowrap">
                    <Text c="blue" fw={700} size="md">
                      ✓
                    </Text>
                    <Text fw={400} size="md" style={{ lineHeight: 1.7 }}>
                      <strong>URL State Management</strong> - Shareable links
                      with Nuqs integration
                    </Text>
                  </Group>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Group align="flex-start" gap="md" wrap="nowrap">
                    <Text c="blue" fw={700} size="md">
                      ✓
                    </Text>
                    <Text fw={400} size="md" style={{ lineHeight: 1.7 }}>
                      <strong>Server-Side Support</strong> - Next.js App Router
                      integration with SSR
                    </Text>
                  </Group>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Group align="flex-start" gap="md" wrap="nowrap">
                    <Text c="blue" fw={700} size="md">
                      ✓
                    </Text>
                    <Text fw={400} size="md" style={{ lineHeight: 1.7 }}>
                      <strong>Type-Safe</strong> - Full TypeScript support with
                      type inference
                    </Text>
                  </Group>
                </Grid.Col>
              </Grid>
            </Stack>
          </Card>
        </Box>

        {/* CTA Section */}
        <Box mb="xl">
          <Card
            p="xl"
            radius="md"
            style={{
              background:
                "linear-gradient(135deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-cyan-6) 100%)",
              color: "white",
            }}
          >
            <Stack align="center" gap="xl" ta="center">
              <Title c="white" fw={700} order={2} size="h2">
                Ready to Get Started?
              </Title>
              <Text
                c="white"
                fw={400}
                maw={600}
                size="md"
                style={{ lineHeight: 1.75, opacity: 0.98 }}
              >
                Build powerful, feature-rich data tables in minutes. Check out
                the demo or dive into the documentation to see how easy it is.
              </Text>
              <Group gap="md" justify="center" mt="md" wrap="wrap">
                <Button
                  color="white"
                  component={Link}
                  href={{ pathname: "/demo" }}
                  radius="md"
                  size="lg"
                  styles={{
                    root: {
                      color: "var(--mantine-color-blue-6)",
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        transform: "translateY(-1px)",
                      },
                    },
                  }}
                  variant="filled"
                >
                  Try Demo
                </Button>
                <Button
                  component={Link}
                  href={{ pathname: "/docs" }}
                  radius="md"
                  size="lg"
                  style={{
                    borderColor: "rgba(255, 255, 255, 0.8)",
                    borderWidth: 2,
                    color: "white",
                    backgroundColor: "transparent",
                    fontWeight: 600,
                  }}
                  styles={{
                    root: {
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        borderColor: "white",
                        transform: "translateY(-1px)",
                      },
                    },
                  }}
                  variant="outline"
                >
                  Read Docs
                </Button>
              </Group>
            </Stack>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
