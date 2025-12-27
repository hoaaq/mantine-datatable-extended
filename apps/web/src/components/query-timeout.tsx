"use client";

import { Group, NumberInput } from "@mantine/core";
import { parseAsInteger, useQueryState } from "nuqs";

export function QueryTimeout() {
  const [timeout, setTimeout] = useQueryState(
    "st",
    parseAsInteger.withDefault(200)
  );
  const [clientTimeout, setClientTimeout] = useQueryState(
    "ct",
    parseAsInteger.withDefault(600)
  );
  return (
    <Group>
      <NumberInput
        label="Server Query Timeout"
        onChange={(value) => setTimeout(Number(value))}
        value={timeout}
      />
      <NumberInput
        label="Client Query Timeout"
        onChange={(value) => setClientTimeout(Number(value))}
        value={clientTimeout}
      />
    </Group>
  );
}
