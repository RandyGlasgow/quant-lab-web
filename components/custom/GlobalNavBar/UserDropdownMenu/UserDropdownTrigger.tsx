"use client";

import { FC, PropsWithChildren } from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/nextjs";

import { UserAvatar } from "./UserAvatar";

export const UserDropdownTrigger: FC<PropsWithChildren> = ({
  children,
  ...props
}) => {
  return (
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="rounded-full">
        <span className="sr-only">Toggle user menu</span>
        <UserAvatar className="w-8 h-8" />
      </Button>
    </DropdownMenuTrigger>
  );
};
