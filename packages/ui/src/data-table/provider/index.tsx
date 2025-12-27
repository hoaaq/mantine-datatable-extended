"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { DataTableContextProps, PaginationPropsType } from "../types";

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

  const [paginationProps, setPaginationProps] = useState<PaginationPropsType>({
    totalRecords: 0,
    recordsPerPageOptions: [10, 20, 30, 40, 50],
  });

  const value = useMemo(
    () =>
      ({
        urlKeys,
        defaultParams,
        storeColumnsKey,
        columns,
        originalUseDataTableColumnsResult,
      }) as DataTableContextProps<Record<string, unknown>>,
    [
      urlKeys,
      defaultParams,
      storeColumnsKey,
      columns,
      originalUseDataTableColumnsResult,
    ]
  );

  return (
    <DataTableContext.Provider
      value={{
        ...value,
        paginationProps,
        setPaginationProps,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
}
