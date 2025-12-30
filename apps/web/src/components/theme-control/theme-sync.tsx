"use client";

import { useMantineColorScheme } from "@mantine/core";
import { useTheme } from "nextra-theme-docs";
import { useEffect } from "react";

export function ThemeSync() {
  const { theme } = useTheme();
  const { setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  useEffect(() => {
    switch (theme) {
      case "dark":
        setColorScheme("dark");
        break;
      case "light":
        setColorScheme("light");
        break;
      default:
        setColorScheme("auto");
        break;
    }
  }, [theme, setColorScheme]);
  return null;
}
