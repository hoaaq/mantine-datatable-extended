export type Task = {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  priority: number;
  estimatedHours: number;
  dueDate: Date | null;
};
