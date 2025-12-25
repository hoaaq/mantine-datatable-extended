import { z } from "zod";
import {
  EFilterVariant,
  ESortDirection,
} from "../enums/data-table-query-param.enum";

export const sortSchema = z.object({
  accessor: z.string(),
  direction: z.enum(ESortDirection),
});

export type TSortCondition = z.infer<typeof sortSchema>;

export const searchSchema = z.object({
  accessors: z.array(z.string()),
  value: z.string(),
});

export type TSearchCondition = z.infer<typeof searchSchema>;

export const filterSchema = z.object({
  variant: z.enum(EFilterVariant),
  accessor: z.string(),
  value: z.union([z.string(), z.array(z.string())]),
});

export type TFilterCondition = z.infer<typeof filterSchema>;
