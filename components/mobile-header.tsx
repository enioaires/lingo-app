import { FC } from "react";
import { MobileSidebar } from "@/components/mobile-sidebar";

type Props = {};

export const MobileHeader: FC<Props> = ({}) => {
  return (
    <nav className="lg:hidden px-6 h-[50px] flex items-center bg-emerald-500 border-b fixed top-0 w-full z-50">
      <MobileSidebar />
    </nav>
  );
};
