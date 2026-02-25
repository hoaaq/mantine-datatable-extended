"use client";

import { Anchor, Group, Stack, Text, Title } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

type TDemoPageHeaderProps = {
  title: string;
  description: string;
  sourcePath?: string;
};

export function DemoPageHeader({
  title,
  description,
  sourcePath,
}: TDemoPageHeaderProps) {
  const gitRepoUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const gitRepoPath = `${gitRepoUrl}/tree/master/apps/web/src/app/demo/${sourcePath}`;
  return (
    <Stack>
      <Group>
        <Title order={2}>{title}</Title>
        {sourcePath && gitRepoPath && (
          <Anchor href={gitRepoPath} target="_blank">
            <Group gap="4" wrap="nowrap">
              <Text size="sm">Source</Text>
              <IconBrandGithub size={16} />
            </Group>
          </Anchor>
        )}
      </Group>
      <Text>{description}</Text>
    </Stack>
  );
}
