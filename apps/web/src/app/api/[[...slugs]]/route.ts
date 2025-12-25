import { cors } from "@elysiajs/cors";
import { TodoController } from "@repo/server";
import { Elysia } from "elysia";

export const app = new Elysia({ prefix: "/api" })
  .use(cors())
  .use(TodoController);

export const GET = app.fetch;
export const POST = app.fetch;

export type AppType = typeof app;
