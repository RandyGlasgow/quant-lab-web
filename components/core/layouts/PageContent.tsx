import { FC, PropsWithChildren } from "react";

export const PageContent: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col p-2 md:p-4">{children}</div>;
};
