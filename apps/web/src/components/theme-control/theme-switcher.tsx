"use client";

import {
  ActionIcon,
  type MantineColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { setColorScheme, colorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  function onThemeChange(value: MantineColorScheme) {
    setColorScheme(value);
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
    shouldRender &&
    (colorScheme === "dark" || colorScheme === "auto" ? (
      <SunThemeIcon />
    ) : (
      <MoonThemeIcon />
    ))
  );
}
