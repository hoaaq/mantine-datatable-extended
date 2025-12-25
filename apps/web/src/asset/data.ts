import type { Task } from "./types";

export const tasks: Task[] = [
  {
    id: "1",
    title: "Task 1",
    description: "Description 1",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "completed",
    priority: 1,
    estimatedHours: 1,
    dueDate: new Date(),
  },
];
