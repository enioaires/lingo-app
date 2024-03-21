import { cache } from "react";
import { getUserProgress } from "./user-progress";
import db from "../drizzle";
import { eq } from "drizzle-orm";
import { challengeProgress, units } from "../schema";
import { auth } from "@clerk/nextjs";

export const getUnits = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userProgress?.activeCourseId || !userId) return [];

  const unitsData = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const normalizedData = unitsData.map((currentUnit) => {
    const lessonsWithCompletedStatus = currentUnit.lessons.map((lesson) => {
      if (lesson.challenges.length === 0)
        return { ...lesson, completed: false };

      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        const progress = challenge.challengeProgress;
        return progress?.length && progress.every((p) => p.completed);
      });

      return {
        ...lesson,
        completed: allCompletedChallenges,
      };
    });

    return { ...currentUnit, lessons: lessonsWithCompletedStatus };
  });

  return normalizedData;
});
