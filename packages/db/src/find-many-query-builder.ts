import {
  and,
  arrayOverlaps,
  asc,
  between,
  type Column,
  desc,
  eq,
  ilike,
  type inArray,
  or,
} from "drizzle-orm";
import type { PgSelect, PgTable } from "drizzle-orm/pg-core";

export interface SortCondition {
  accessor: string;
  direction: string;
}

export interface SearchCondition {
  accessors: string[];
  value: string;
}

export const filterVariant = {
  TEXT: "text",
  NUMBER: "number",
  NUMBER_RANGE: "number_range",
  DATE: "date",
  DATE_RANGE: "date_range",
  SINGLE_SELECT: "single_select",
  MULTI_SELECT: "multi_select",
} as const;
export type FilterVariant = (typeof filterVariant)[keyof typeof filterVariant];

export interface FilterCondition {
  accessor: string;
  variant: FilterVariant;
  value: string | string[];
}

export interface QueryParams {
  page?: number;
  pageSize?: number;
  sorts?: SortCondition[];
  search?: SearchCondition;
  filters?: FilterCondition[];
}

export class QueryBuilder<T extends PgTable, TQuery extends PgSelect> {
  private query: TQuery;
  private readonly table: T;

  constructor(query: TQuery, table: T) {
    this.query = query;
    this.table = table;
  }

  /**
   * Apply sorting to the query
   */
  applySorts(sorts: SortCondition[]): this {
    if (!sorts || sorts.length === 0) {
      return this;
    }

    const orderByStatements = sorts
      .map((sort) => {
        const column = this.table[sort.accessor as keyof T] as Column;
        if (!column) {
          return null;
        }

        return sort.direction === "asc" ? asc(column) : desc(column);
      })
      .filter((statement) => statement !== null);

    if (orderByStatements.length > 0) {
      this.query = this.query.orderBy(...orderByStatements) as TQuery;
    }

    return this;
  }

  /**
   * Apply pagination to the query
   */
  applyPagination(page?: number, pageSize?: number): this {
    if (page && pageSize && page > 0 && pageSize > 0) {
      this.query = this.query
        .offset((page - 1) * pageSize)
        .limit(pageSize) as TQuery;
    }

    return this;
  }

  /**
   * Build filter conditions without applying them
   */
  private buildFilterConditions(
    filters: FilterCondition[]
  ): Array<
    | ReturnType<typeof eq>
    | ReturnType<typeof between>
    | ReturnType<typeof inArray>
    | undefined
  > {
    if (!filters || filters.length === 0) {
      return [];
    }

    return filters.map((filter) => {
      if (!filter.value || filter.value.length === 0) {
        return undefined;
      }
      switch (filter.variant) {
        case filterVariant.TEXT:
          return eq(
            this.table[filter.accessor as keyof T] as Column,
            filter.value as string
          );
        case filterVariant.NUMBER:
          return eq(
            this.table[filter.accessor as keyof T] as Column,
            Number.parseInt(filter.value as string, 10)
          );
        case filterVariant.DATE: {
          const [startOfDay, endOfDay] = [
            new Date(
              new Date(Number.parseInt(filter.value as string, 10)).setHours(
                0,
                0,
                0,
                0
              )
            ),
            new Date(
              new Date(Number.parseInt(filter.value as string, 10)).setHours(
                23,
                59,
                59,
                999
              )
            ),
          ];
          return between(
            this.table[filter.accessor as keyof T] as Column,
            startOfDay,
            endOfDay
          );
        }
        case filterVariant.DATE_RANGE: {
          if (!(filter.value[0] && filter.value[1])) {
            return undefined;
          }
          const [fromDate, toDate] = [
            new Date(Number.parseInt(filter.value[0], 10)),
            new Date(Number.parseInt(filter.value[1], 10)),
          ];
          return between(
            this.table[filter.accessor as keyof T] as Column,
            fromDate,
            toDate
          );
        }
        case filterVariant.NUMBER_RANGE: {
          if (!(filter.value[0] && filter.value[1])) {
            return undefined;
          }
          const [fromNumber, toNumber] = [
            Number.parseInt(filter.value[0], 10),
            Number.parseInt(filter.value[1], 10),
          ];
          return between(
            this.table[filter.accessor as keyof T] as Column,
            fromNumber,
            toNumber
          );
        }
        case filterVariant.SINGLE_SELECT:
          return eq(
            this.table[filter.accessor as keyof T] as Column,
            filter.value as string
          );
        case filterVariant.MULTI_SELECT:
          return arrayOverlaps(
            this.table[filter.accessor as keyof T] as Column,
            filter.value as string[]
          );
        default:
          return undefined;
      }
    });
  }

  /**
   * Build search conditions without applying them
   */
  private buildSearchConditions(
    search: SearchCondition
  ): ReturnType<typeof or> | undefined {
    if (!search || search.accessors.length === 0 || search.value.length === 0) {
      return undefined;
    }

    const whereConditions = search.accessors.map((accessor) => {
      return ilike(
        this.table[accessor as keyof T] as Column,
        `%${search.value}%`
      );
    });

    return whereConditions.length > 0 ? or(...whereConditions) : undefined;
  }

  /**
   * Apply all query parameters at once
   */
  applyParams(params: QueryParams, isCountQuery = false): this {
    // Build all WHERE conditions first
    const allWhereConditions: Array<
      | ReturnType<typeof eq>
      | ReturnType<typeof between>
      | ReturnType<typeof inArray>
      | ReturnType<typeof or>
      | undefined
    > = [];

    // Add filter conditions
    if (params.filters) {
      const filterConditions = this.buildFilterConditions(params.filters);
      allWhereConditions.push(...filterConditions);
    }

    // Add search condition
    if (params.search) {
      const searchCondition = this.buildSearchConditions(params.search);
      if (searchCondition) {
        allWhereConditions.push(searchCondition);
      }
    }

    // Apply all WHERE conditions together in a single call
    const validConditions = allWhereConditions.filter(
      (condition): condition is NonNullable<typeof condition> =>
        condition !== undefined
    );

    if (validConditions.length > 0) {
      // Combine filters (AND) with search (OR) properly
      // Filters should be ANDed together, search is ORed internally
      // Then combine: (filter1 AND filter2) AND (search1 OR search2)
      this.query = this.query.where(and(...validConditions)) as TQuery;
    }

    if (!isCountQuery) {
      // 2. ORDER BY (sort the filtered results)
      if (params.sorts) {
        this.applySorts(params.sorts);
      }

      // 3. LIMIT/OFFSET (paginate the filtered & sorted results)
      if (params.page && params.pageSize) {
        this.applyPagination(params.page, params.pageSize);
      }
    }

    return this;
  }

  /**
   * Get the final query
   */
  build(): TQuery {
    return this.query;
  }
}

/**
 * Helper function to create a query builder
 */
export function createQueryBuilder<T extends PgTable, TQuery extends PgSelect>(
  query: TQuery,
  table: T
): QueryBuilder<T, TQuery> {
  return new QueryBuilder(query, table);
}
