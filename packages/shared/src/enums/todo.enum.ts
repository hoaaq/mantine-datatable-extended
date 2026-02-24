export const ETodoStatus = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
} as const;

export type ETodoStatus = (typeof ETodoStatus)[keyof typeof ETodoStatus];
