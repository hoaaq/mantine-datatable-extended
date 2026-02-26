"use client";

import { DteExtended, useDteContext } from "@repo/ui";
import { useEffect } from "react";
import { useData } from "./data";

export function DataTableBody() {
  const { records, totalRecords, isFetching } = useData();
  const { setTotalRecords } = useDteContext();

  useEffect(() => {
    setTotalRecords?.(totalRecords);
  }, [totalRecords, setTotalRecords]);

  return (
    <DteExtended
      fetching={isFetching}
      height={500}
      records={records}
      withColumnBorders
      withRowBorders
      withTableBorder
    />
  );
}
