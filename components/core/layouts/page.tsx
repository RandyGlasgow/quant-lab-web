import React, { HTMLAttributes, ReactNode } from 'react';

import {
    NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList, NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

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
    <main className={cn("relative", "min-h-screen", "mx-auto")} {...rest}>
      {navInjection}
      <div className={cn("mx-auto bg-background", className)}>
        {children}
      </div>
    </main>
  );
};
