import { FC } from "react";
import { Header } from "./header";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";

const LearnPage: FC = () => {
  return (
    <div className="flex gap-[48px] px-6">
      <FeedWrapper>
        <Header title="Inglês" />
        <div className="h-96 w-full bg-blue-500" />
        <div className="h-96 w-full bg-blue-500" />
        <div className="h-96 w-full bg-blue-500" />
        <div className="h-96 w-full bg-blue-500" />
        <div className="h-96 w-full bg-blue-500" />
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: "Inglês", imageSrc: "/us.svg" }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
    </div>
  );
};
export default LearnPage;
