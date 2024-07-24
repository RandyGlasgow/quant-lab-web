"use client";
import { LogInIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { SignInButton, useAuth, useUser } from '@clerk/nextjs';
import { BarChartIcon, GridIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { UserSignOut } from './SignOut';
import { UserCard } from './UserCard';
import { UserDropdownTrigger } from './UserDropdownTrigger';

export const UserDropdownMenu = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded)
    return (
      <div className="w-8 h-8 py-4 rounded-md animate-pulse bg-muted" />
    );


  if (!isSignedIn)
    return (
      <Button className="gap-2">
        <SignInButton />
        <LogInIcon className="w-4 h-4" />
      </Button>
    );

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
