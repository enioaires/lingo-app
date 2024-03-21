import { auth } from "@clerk/nextjs";
import { cache } from "react";
import { getCourseProgress } from "./courses";
import { eq } from "drizzle-orm";
import { challengeProgress, lessons } from "../schema";
import db from "../drizzle";

export const getLesson = cache(async (id?: number) => {
  const { userId } = await auth();
  const courseProgress = await getCourseProgress();

  if (!userId) return null;

  const lessonId = id || courseProgress?.activeLessonId;

  if (!lessonId) return null;

  const lesson = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  });

  if (!lesson || !lesson.challenges) return null;

  const normalizedChallenges = lesson.challenges.map((challenge) => {
    const progress = challenge.challengeProgress;
    const completed =
      progress?.length > 0 && progress.every((p) => p.completed);

    return {
      ...challenge,
      completed,
    };
  });

  return {
    ...lesson,
    challenges: normalizedChallenges,
  };
});

export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress();

  if (!courseProgress?.activeLessonId) return 0;

  const lesson = await getLesson(courseProgress.activeLessonId);

  if (!lesson) return 0;

  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed
  );

  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100
  );

  return percentage;
});
