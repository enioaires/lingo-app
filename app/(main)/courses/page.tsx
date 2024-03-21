import { FC } from "react";
import { List } from "./list";
import { getCourses } from "@/db/queries/courses";
import { getUserProgress } from "@/db/queries/user-progress";

const CorusesPage: FC = async () => {
  const coursesData = getCourses();
  const userProgressData = getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ]);

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">
        Cursos Linguisiticos
      </h1>
      <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
    </div>
  );
};

export default CorusesPage;
