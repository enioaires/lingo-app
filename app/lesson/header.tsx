import { FC } from "react";
import Image from "next/image";
import { InfinityIcon, XIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useExitModal } from "@/store/use-exit-modal";

type Props = {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
};

export const Header: FC<Props> = ({
  hearts,
  percentage,
  hasActiveSubscription,
}) => {
  const { open } = useExitModal();
  return (
    <header className="lg:pt-12 pt-5 px-10 flex gap-x-7 items-center justify-between max-w-6xl mx-auto w-full">
      <XIcon
        onClick={open}
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />
      <Progress value={percentage} />
      <div className="text-rose-500 flex items-center font-bold">
        <Image
          alt="hearts"
          src="/heart.svg"
          width={28}
          height={28}
          className="mr-2"
        />
        {hasActiveSubscription ? (
          <InfinityIcon className="h-6 w-6 stroke-[3]" />
        ) : (
          hearts
        )}
      </div>
    </header>
  );
};
