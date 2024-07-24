"use client";
import { FC } from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

export const UserAvatar: FC<{ className?: string }> = ({ className }) => {
  const { user } = useUser();
  const firstLetter = user?.firstName ? user.firstName[0] : "";
  const lastLetter = user?.lastName ? user?.lastName[0] : "";
  return (
    <Avatar className={cn("h-4", "w-4", className)}>
      <AvatarImage src="/placeholder-user.jpg" />
      <AvatarFallback>{firstLetter + lastLetter}</AvatarFallback>
    </Avatar>
  );
};
