import { treaty } from "@elysiajs/eden";
import type { AppType } from "@/app/api/[[...slugs]]/route";

export const client = treaty<AppType>(
  process.env.NEXT_PUBLIC_BASE_URL as string
);
