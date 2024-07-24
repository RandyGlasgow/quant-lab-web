"use client";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@clerk/nextjs";
import { ExitIcon } from "@radix-ui/react-icons";

export const UserSignOut = () => {
  const { signOut } = useAuth();

  return (
    <Button
      onClick={() => signOut()}
      variant="secondary"
      className="flex justify-between w-full gap-2 hover:bg-destructive/80 hover:text-destructive-foreground"
    >
      <span>Logout</span>
      <ExitIcon />
    </Button>
  );
};
