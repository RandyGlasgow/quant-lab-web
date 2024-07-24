import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  BarChartIcon,
  BoxIcon,
  GridIcon,
  GroupIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

import { UserSignOut } from "./SignOut";
import { UserAvatar } from "./UserAvatar";
import { UserCard } from "./UserCard";
import { UserDropdownTrigger } from "./UserDropdownTrigger";

export const UserDropdownMenu = () => {
  return (
    <DropdownMenu>
      <UserDropdownTrigger />
      <DropdownMenuContent align="end">
        <UserCard />
        <DropdownMenuSeparator />
        <Link href="/watch-list" className="w-full">
          <DropdownMenuItem className="p-0">
            <Button
              variant="ghost"
              className="items-center gap-2 px-2 py-0"
            >
              <GridIcon />
              <span>Portfolio</span>
            </Button>
          </DropdownMenuItem>
        </Link>

        <Link href="/analysis">
          <DropdownMenuItem className="p-0">
            <Button
              variant="ghost"
              className="items-center gap-2 px-2 py-0"
            >
              <BarChartIcon />
              <span>Analysis</span>
            </Button>
          </DropdownMenuItem>
        </Link>

        <Link href="/research">
          <DropdownMenuItem className="p-0">
            <Button
              variant="ghost"
              className="items-center gap-2 px-2 py-0"
            >
              <MagnifyingGlassIcon />
              <span>Research</span>
            </Button>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <UserSignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
