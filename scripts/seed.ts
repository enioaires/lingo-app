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
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.courses).values([
      { id: 1, title: "Espanhol", imageSrc: "/es.svg" },
      { id: 2, title: "Inglês", imageSrc: "/us.svg" },
      { id: 3, title: "Japonês", imageSrc: "/jp.svg" },
      { id: 4, title: "Francês", imageSrc: "/fr.svg" },
      { id: 5, title: "Italinao", imageSrc: "/it.svg" },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, // Espanhol
        title: "Unidade 1",
        description: "Aprenda o básico do espanhol",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Unidade 1
        title: "Substantivos",
        order: 1,
      },
      {
        id: 2,
        unitId: 1, // Unidade 1
        title: "Vocabulário",
        order: 2,
      },
      {
        id: 3,
        unitId: 1, // Unidade 1
        title: "Verbos",
        order: 3,
      },
      {
        id: 4,
        unitId: 1, // Unidade 1
        title: "Frases",
        order: 4,
      },
      {
        id: 5,
        unitId: 1, // Unidade 1
        title: "Pronomes",
        order: 5,
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Substantivos
        type: "SELECT",
        question: "Qual destes é o 'Homem'",
        order: 1,
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1,
        text: "El hombre",
        correct: true,
        imageSrc: "/man.svg",
        audioSrc: "/es_man.mp3",
      },
      {
        id: 2,
        challengeId: 1,
        text: "La mujer",
        correct: false,
        imageSrc: "/woman.svg",
        audioSrc: "/es_woman.mp3",
      },
      {
        id: 3,
        challengeId: 1,
        text: "El zumbi",
        correct: false,
        imageSrc: "/zombie.svg",
        audioSrc: "/es_zombie.mp3",
      },
    ]);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
