import { Home, LineChart, Package, Package2, Settings, ShoppingCart, Users2 } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

import { TooltipLink } from '../Tooltips/TooltipLink';

export const AsideNav: FC = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 flex-col hidden border-r w-14 bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          href="#"
          className="flex items-center justify-center gap-2 text-lg font-semibold rounded-full group h-9 w-9 shrink-0 bg-primary text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="w-4 h-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <TooltipLink href="#" icon={Home} label="Dashboard" />
        <TooltipLink href="#" icon={ShoppingCart} label="Orders" />
        <TooltipLink href="#" icon={Package} label="Products" />
        <TooltipLink href="#" icon={Users2} label="Customers" />
        <TooltipLink href="#" icon={LineChart} label="Analytics" />
      </nav>
      <nav className="flex flex-col items-center gap-4 px-2 mt-auto sm:py-4">
        <TooltipLink href="#" icon={Settings} label="Settings" />
      </nav>
    </aside>
  );
};
