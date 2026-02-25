"use client";

import { DataTableExtended, useDataTableContext } from "@repo/ui";
import { useEffect } from "react";
import { useData } from "./data";

export function DataTable() {
  const { paginatedRecords, totalRecords, isFetching } = useData();
  const { setTotalRecords } = useDataTableContext();

  useEffect(() => {
    setTotalRecords?.(totalRecords);
  }, [totalRecords, setTotalRecords]);

  return (
    <DataTableExtended
      fetching={isFetching}
      height={406}
      records={paginatedRecords}
      withColumnBorders
      withRowBorders
      withTableBorder
    />
  );
}
