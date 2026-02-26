"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { DataTableContextProps, DataTableProviderProps } from "../types";
import {
  type DataTableI18n,
  DEFAULT_DATA_TABLE_I18N,
} from "../types/i18n.type";

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

export function DataTableProvider<T = Record<string, unknown>>({
  children,
  urlKeys,
  defaultParams,
  storeColumnsKey,
  columns,
  originalUseDataTableColumnsResult,
  i18n: i18nInput,
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

  const i18n: DataTableI18n = useMemo(
    () => ({
      view: { ...DEFAULT_DATA_TABLE_I18N.view, ...i18nInput?.view },
      sort: { ...DEFAULT_DATA_TABLE_I18N.sort, ...i18nInput?.sort },
      search: { ...DEFAULT_DATA_TABLE_I18N.search, ...i18nInput?.search },
      filter: { ...DEFAULT_DATA_TABLE_I18N.filter, ...i18nInput?.filter },
      pagination: {
        ...DEFAULT_DATA_TABLE_I18N.pagination,
        ...i18nInput?.pagination,
      },
    }),
    [i18nInput]
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
        i18n,
      }) as DataTableContextProps<Record<string, unknown>>,
    [
      urlKeys,
      defaultParams,
      storeColumnsKey,
      columns,
      originalUseDataTableColumnsResult,
      paginationProps,
      i18n,
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
