"use client";

import { DataTableExtended, useDataTableContext } from "@repo/ui";
import { useEffect } from "react";
import { useData } from "./data";

export function DataTableBody() {
  const { records, totalRecords, isFetching } = useData();
  const { setTotalRecords } = useDataTableContext();

  useEffect(() => {
    setTotalRecords?.(totalRecords);
  }, [totalRecords, setTotalRecords]);

  return (
    <DataTableExtended
      fetching={isFetching}
      height={500}
      records={records}
      withColumnBorders
      withRowBorders
      withTableBorder
    />
  );
}
