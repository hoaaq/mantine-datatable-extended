import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { db } from ".";
import { table } from "./schema";

const __dirname = dirname(fileURLToPath(import.meta.url));

type SeedRecord = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: number;
  estimatedHours: number;
  dueDate: string | null;
  tags: string[] | null;
  createdAt: string;
};

const seedTask = async () => {
  try {
    const seedData = JSON.parse(
      readFileSync(join(__dirname, "seed-data.json"), "utf-8")
    ) as SeedRecord[];

    await db.delete(table.task).execute();

    await db.insert(table.task).values(
      seedData.map((record) => ({
        ...record,
        dueDate: record.dueDate ? new Date(record.dueDate) : null,
        createdAt: new Date(record.createdAt),
        updatedAt: new Date(record.createdAt),
      }))
    );

    console.log(`Seeded ${seedData.length} tasks`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedTask();
