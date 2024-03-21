import { cache } from "react";
import { getUserProgress } from "./user-progress";
import db from "../drizzle";
import { eq } from "drizzle-orm";
import { units } from "../schema";

export const getUnits = cache(async () => {
  const userProgress = await getUserProgress();

  if (!userProgress?.activeCourseId) return [];

  const unitsData = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: true,
            },
          },
        },
      },
    },
  });

  const normalizedData = unitsData.map((currentUnit) => {
    const lessonsWithCompletedStatus = currentUnit.lessons.map((lesson) => {
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
