import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { FC } from "react";
import { Quiz } from "./quiz";

const LessonPage: FC = async ({}) => {
  const lessonData = getLesson();
  const userProgressData = getUserProgress();

  const [lesson, userProgress] = await Promise.all([
    lessonData,
    userProgressData,
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const challenges = lesson.challenges;
  const initialPercentage =
    (challenges.filter((challenge) => challenge.completed).length /
      challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={null}
    />
  );
};
export default LessonPage;
