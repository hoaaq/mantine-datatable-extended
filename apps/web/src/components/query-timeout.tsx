"use client";

import { Group, NumberInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { parseAsInteger, useQueryState } from "nuqs";

export function QueryTimeout() {
  const [timeout, setTimeout] = useQueryState(
    "st",
    parseAsInteger.withDefault(200)
  );
  const [clientTimeout, setClientTimeout] = useQueryState(
    "ct",
    parseAsInteger.withDefault(1000)
  );
  const debouncedSetTimeout = useDebouncedCallback((value: number) => {
    setTimeout(value);
  }, 300);
  const debouncedSetClientTimeout = useDebouncedCallback((value: number) => {
    setClientTimeout(value);
  }, 300);
  return (
    <Group>
      <NumberInput
        label="Server Query Timeout"
        onChange={(value) => debouncedSetTimeout(Number(value))}
        value={timeout}
      />
      <NumberInput
        label="Client Query Timeout"
        onChange={(value) => debouncedSetClientTimeout(Number(value))}
        value={clientTimeout}
      />
    </Group>
  );
}
