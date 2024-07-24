"use client";
import { useUser } from "@clerk/nextjs";

import { UserAvatar } from "./UserAvatar";

export const UserCard = () => {
  const { user } = useUser();
  return (
    <div className="flex items-center gap-2 p-2">
      <UserAvatar className="w-8 h-8" />
      <div className="grid gap-1 leading-none">
        <div className="font-semibold">{user?.fullName}</div>
        <div className="text-xs text-muted-foreground line-clamp-1 max-w-44 overflow-ellipsis text-nowrap">
          {user?.emailAddresses[0].emailAddress}
        </div>
      </div>
    </div>
  );
};
