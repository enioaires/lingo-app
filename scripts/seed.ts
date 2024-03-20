import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);

    await db.insert(schema.courses).values([
      { id: 1, title: "Espanhol", imageSrc: "/es.svg" },
      { id: 2, title: "Inglês", imageSrc: "/us.svg" },
      { id: 3, title: "Japonês", imageSrc: "/jp.svg" },
      { id: 4, title: "Francês", imageSrc: "/fr.svg" },
      { id: 5, title: "Italinao", imageSrc: "/it.svg" },
    ]);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
