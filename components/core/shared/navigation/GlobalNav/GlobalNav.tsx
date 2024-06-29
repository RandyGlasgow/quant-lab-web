import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/nextjs';

export const GlobalNav = () => {
  return (
    <nav className="flex items-center justify-between pb-2 border-b">
      <span id="left-group" className="flex items-center">
        <Button asChild variant="link" className="p-0">
          <Link href="/">Home</Link>
        </Button>
        <Link href={"/dashboard"}>
          <Button variant={"link"}>Dashboard</Button>
        </Link>
      </span>
      <span id="right-group" className="flex items-center">
        <SignedIn>
          <Button asChild variant="secondary">
            <SignOutButton />
          </Button>
        </SignedIn>
        <SignedOut>
          <Button asChild variant="secondary">
            <SignInButton />
          </Button>
        </SignedOut>
      </span>
    </nav>
  );
};
