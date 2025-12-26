import { Elysia, t } from "elysia";
import {
  queryParamsElysiaModel,
  type StaticQueryParamsType,
  taskModel,
} from "./model";
import { TodoService } from "./service";

const getManyTasks = new Elysia({ name: "get-many-tasks" }).get(
  "/task",
  async ({ query }) => {
    const { items, totalRecords } = await TodoService.getManyTasks({
      query: query as unknown as StaticQueryParamsType,
    });
    await new Promise((resolve) => setTimeout(resolve, query.sleep ?? 0));
    return {
      data: {
        items,
        totalRecords,
      },
    };
  },
  {
    query: queryParamsElysiaModel,
    response: t.Object({
      data: t.Object({
        items: t.Array(taskModel.entity),
        totalRecords: t.Number(),
      }),
    }),
    tags: ["Todo"],
  }
);

export const TodoController = new Elysia({
  name: "todo-controller",
  prefix: "/todo",
}).use(getManyTasks);
