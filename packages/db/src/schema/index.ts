export * from "./todo";

import { task } from "./todo";

export const table = {
  task,
} as const;

export type Table = typeof table;
