import { cn } from "@/lib/utils";
import { FC } from "react";

type Props = {
  className?: string;
};

export const Sidebar: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      sidebar
    </div>
  );
};
