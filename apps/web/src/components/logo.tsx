"use client";

import {
  ActionIcon,
  Indicator,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconSparkles, IconTable } from "@tabler/icons-react";
import Link from "next/link";

export default function Logo() {
  const theme = useMantineTheme();
  return (
    <Indicator
      color="transparent"
      label={
        <ThemeIcon style={{ transform: "rotate(0deg)" }} variant="transparent">
          <IconSparkles
            color={`light-dark(${theme.colors.yellow[6]}, ${theme.colors.yellow[3]})`}
            size={18}
          />
        </ThemeIcon>
      }
      offset={6}
    >
      <ActionIcon component={Link} href="/" size={36} variant="subtle">
        <IconTable
          color={`light-dark(${theme.colors.gray[7]}, ${theme.colors.gray[4]})`}
          size={22}
        />
      </ActionIcon>
    </Indicator>
  );
}
