"use client";

import {
  ActionIcon,
  type MantineColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "nextra-theme-docs";
import { useEffect, useState } from "react";
import { ThemeSync } from "./theme-sync";

export default function ThemeSwitcher() {
  const { setTheme } = useTheme();
  const { setColorScheme, colorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  function onThemeChange(value: MantineColorScheme) {
    setColorScheme(value);
    setTheme(value === "dark" ? "dark" : "light");
  }

  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    setShouldRender(true);
  }, []);

  const SunThemeIcon = () => (
    <ActionIcon
      color="yellow"
      onClick={() => onThemeChange("light")}
      variant="subtle"
    >
      <IconSun size={18} />
    </ActionIcon>
  );

  const MoonThemeIcon = () => (
    <ActionIcon
      color="gray"
      onClick={() => onThemeChange("dark")}
      variant="subtle"
    >
      <IconMoon size={18} />
    </ActionIcon>
  );

  return (
    <>
      <ThemeSync />
      {shouldRender &&
        (colorScheme === "dark" || colorScheme === "auto" ? (
          <SunThemeIcon />
        ) : (
          <MoonThemeIcon />
        ))}
    </>
  );
}
