"use client";

import { DteExtended, useDteContext } from "@repo/ui";
import { useEffect } from "react";
import { useData } from "./data";

export function DataTable() {
  const { paginatedRecords, totalRecords, isFetching } = useData();
  const { setTotalRecords } = useDteContext();

  useEffect(() => {
    setTotalRecords?.(totalRecords);
  }, [totalRecords, setTotalRecords]);

  return (
    <DteExtended
      fetching={isFetching}
      height={406}
      records={paginatedRecords}
      withColumnBorders
      withRowBorders
      withTableBorder
    />
  );
}
