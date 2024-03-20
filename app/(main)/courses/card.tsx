import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

type Props = {
  id: number;
  title: string;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
};

export const Card: FC<Props> = ({
  id,
  title,
  imageSrc,
  onClick,
  disabled,
  active,
}) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <div className="min-[24px] w-full flex items-center justify-end">
        {active && (
          <div className="rounded-md bg-emerald-600 flex items-center justify-center p-1.5">
            <CheckIcon className="text-white stroke-[4] h-4 w-4" />
          </div>
        )}
      </div>
      <Image
        alt={title}
        src={imageSrc}
        width={93.33}
        height={70}
        className="rounded-lg drop-shadow-md border object-cover"
      />
      <p className="text-neutral-700 text-center font-bold mt-3">{title}</p>
    </div>
  );
};
