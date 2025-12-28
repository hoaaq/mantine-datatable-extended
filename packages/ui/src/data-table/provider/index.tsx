"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { DataTableContextProps } from "../types";

const DataTableContext = createContext<
  DataTableContextProps<Record<string, unknown>> | undefined
>(undefined);

export function useDataTableContext<
  T = Record<string, unknown>,
>(): DataTableContextProps<T> {
  const context = useContext(DataTableContext);

  if (!context) {
    throw new Error(
      "useDataTableContext must be used within a DataTableProvider"
    );
  }

  return context as DataTableContextProps<T>;
}

type DataTableProviderProps<T = Record<string, unknown>> = {
  children: React.ReactNode;
} & DataTableContextProps<T>;

export function DataTableProvider<T = Record<string, unknown>>({
  children,
  urlKeys,
  defaultParams,
  storeColumnsKey,
  columns,
  originalUseDataTableColumnsResult,
}: DataTableProviderProps<T>) {
  if (!storeColumnsKey) {
    throw new Error("storeColumnsKey property is required");
  }
  if (!columns) {
    throw new Error("columns property is required");
  }

  const [totalRecords, setTotalRecords] = useState(0);
  const [recordsPerPageOptions, setRecordsPerPageOptions] = useState<number[]>([
    10, 20, 30, 40, 50,
  ]);

  const paginationProps = useMemo(
    () => ({
      totalRecords,
      recordsPerPageOptions,
    }),
    [totalRecords, recordsPerPageOptions]
  );

  const value = useMemo(
    () =>
      ({
        urlKeys,
        defaultParams,
        storeColumnsKey,
        columns,
        originalUseDataTableColumnsResult,
        paginationProps,
        setTotalRecords,
        setRecordsPerPageOptions,
      }) as DataTableContextProps<Record<string, unknown>>,
    [
      urlKeys,
      defaultParams,
      storeColumnsKey,
      columns,
      originalUseDataTableColumnsResult,
      paginationProps,
    ]
  );

  return (
    <DataTableContext.Provider
      value={{
        ...value,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
}
