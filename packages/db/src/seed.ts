import { fakerEN_US as faker } from "@faker-js/faker";
import { db } from ".";
import { table } from "./schema";

const seedTask = async () => {
  try {
    await db.delete(table.task).execute();
    await db.insert(table.task).values(
      Array.from({ length: 125 }, () => ({
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        status: faker.helpers.arrayElement([
          "pending",
          "in_progress",
          "completed",
        ]),
        priority: faker.number.int({ min: 1, max: 10 }),
        estimatedHours: faker.number.int({ min: 1, max: 24 }),
        dueDate: faker.date.future(),
        tags: faker.helpers.arrayElements(faker.lorem.words(10).split(" ")),
        createdAt: faker.date.past(),
      }))
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedTask();
