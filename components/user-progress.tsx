import Link from "next/link";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";

type Props = {
  activeCourse: { title: string; imageSrc: string };
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const UserProgress: FC<Props> = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
}) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href="/courses">
        <Button variant="ghost">
          <Image
            className="rounded-md border"
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            width={32}
            height={32}
          />
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-orange-500 space-x-2">
          <Image
            className="rounded-md border"
            src="/points.svg"
            alt="Points"
            width={28}
            height={28}
          />
          <span>{points}</span>
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-rose-500 space-x-2">
          <Image
            className="rounded-md border"
            src="/heart.svg"
            alt="Hearts"
            width={28}
            height={28}
          />
          <span>
            {hasActiveSubscription ? (
              <InfinityIcon className="h-4 w-4 stroke-[3]" />
            ) : (
              hearts
            )}
          </span>
        </Button>
      </Link>
    </div>
  );
};
