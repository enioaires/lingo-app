import { FC } from "react";

type Props = {
  children: React.ReactNode;
};

export const FeedWrapper: FC<Props> = ({ children }) => {
  return <div className="flex-1 relative top-0 pb-10">{children}</div>;
};
