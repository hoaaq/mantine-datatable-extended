"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { TDteContextProps, TDteI18n, TDteProviderProps } from "../types";
import { DEFAULT_DTE_I18N } from "../types/i18n.type";

const DteContext = createContext<
  TDteContextProps<Record<string, unknown>> | undefined
>(undefined);

export function useDteContext<
  T = Record<string, unknown>,
>(): TDteContextProps<T> {
  const context = useContext(DteContext);

  if (!context) {
    throw new Error("useDteContext must be used within a DteProvider");
  }

  return context as TDteContextProps<T>;
}

export function DteProvider<T = Record<string, unknown>>({
  children,
  urlKeys,
  defaultParams,
  storeColumnsKey,
  columns,
  originalUseDataTableColumnsResult,
  i18n: i18nInput,
}: TDteProviderProps<T>) {
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

  const i18n: TDteI18n = useMemo(
    () => ({
      view: { ...DEFAULT_DTE_I18N.view, ...i18nInput?.view },
      sort: { ...DEFAULT_DTE_I18N.sort, ...i18nInput?.sort },
      search: { ...DEFAULT_DTE_I18N.search, ...i18nInput?.search },
      filter: { ...DEFAULT_DTE_I18N.filter, ...i18nInput?.filter },
      pagination: {
        ...DEFAULT_DTE_I18N.pagination,
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
      }) as TDteContextProps<Record<string, unknown>>,
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
    <DteContext.Provider
      value={{
        ...value,
      }}
    >
      {children}
    </DteContext.Provider>
  );
}
