import React, { HTMLAttributes, ReactNode } from 'react';

import {
    NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList, NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

import { GlobalNav } from '../shared/navigation/GlobalNav/GlobalNav';

export const PageLayout = ({
  children,
  className = "",
  navInjection = null,
  ...rest
}: HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  navInjection?: ReactNode | ReactNode[];
}) => {
  return (
    <main
      className={cn(
        "relative",
        "min-h-screen",
        "max-w-7xl",
        "mx-auto",
        "px-2",
        "pt-2",
        ...className.split(" ")
      )}
      {...rest}
    >
      {navInjection}
      <div>{children}</div>
    </main>
  );
};
