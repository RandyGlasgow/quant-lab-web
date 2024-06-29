import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  TriangleIcon,
  Truck,
  Users2,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { AsideNav } from "./components/Aside/AsideNav";

const DynamicBreadcrumbs = dynamic(
  () =>
    import("./components/Breadcrumb/Breadcrumb").then(
      (mod) => mod.PageBreadcrumbs
    ),
  { ssr: false, loading: () => <Skeleton className="w-1/6 h-6" /> }
);

const DynamicAvatarDropdown = dynamic(
  () =>
    import("./components/Avatar/AvatarDropdown").then(
      (mod) => mod.AvatarDropdown
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="rounded-full w-9 h-9" />,
  }
);

const DynamicSearchBar = dynamic(
  () =>
    import("./components/SearchBar/SearchBar").then(
      (mod) => mod.SearchBar
    ),
  {
    ssr: false,
    loading: () => (
      <Skeleton className=" w-full max-w-[200px] lg:max-w-[320px] h-8 ml-auto" />
    ),
  }
);

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-muted/40">
      <AsideNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-4 border-b h-14 bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="w-5 h-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center justify-center w-10 h-10 gap-2 text-lg font-semibold rounded-full group shrink-0 bg-primary text-primary-foreground md:text-base"
                >
                  <Package2 className="w-5 h-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="w-5 h-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Package className="w-5 h-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="w-5 h-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="w-5 h-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <DynamicBreadcrumbs />
          <DynamicSearchBar />
          <DynamicAvatarDropdown />
        </header>
        <main className="grid items-start flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid items-start gap-4 auto-rows-max md:gap-8 lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 cols-span-full">
              <Card>
                <CardHeader>Nasdaq</CardHeader>
              </Card>
              {/* Sockmarket tool */}
              <Card>
                <CardHeader> Dow Jones</CardHeader>
              </Card>
              <Card>
                <CardHeader>Stock Market</CardHeader>
              </Card>
            </div>
            <div className="col-span-full">
              <Card>
                <CardHeader>Top Movers</CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableHead>Symbol</TableHead>
                      <TableHead>% Change</TableHead>
                      <TableHead>Last Close</TableHead>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>APPL</TableCell>
                        <TableCell className="flex items-center gap-1">
                          <span>
                            <ArrowDownIcon
                              size={16}
                              className="text-red-700"
                            />
                            <span className="sr-only">Down</span>
                          </span>
                          <span className="text-red-700">-1.2%</span>
                        </TableCell>
                        <TableCell>$145.83</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>GOOGL</TableCell>
                        <TableCell className="flex items-center gap-1">
                          <span>
                            <ArrowUpIcon
                              size={16}
                              className="text-green-700"
                            />
                            <span className="sr-only">Up</span>
                          </span>
                          <span className="text-green-700">5.4%</span>
                        </TableCell>
                        <TableCell>$2,345.67</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>AMZN</TableCell>
                        <TableCell className="flex items-center gap-1">
                          <span>
                            <ArrowUpIcon
                              size={16}
                              className="text-green-700"
                            />
                            <span className="sr-only">Up</span>
                          </span>
                          <span className="text-green-700">3.2%</span>
                        </TableCell>
                        <TableCell>$3,456.78</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>MSFT</TableCell>
                        <TableCell className="flex items-center gap-1">
                          <span>
                            <ArrowDownIcon
                              size={16}
                              className="text-red-700"
                            />
                            <span className="sr-only">Up</span>
                          </span>
                          <span className="text-red-700">-2.1%</span>
                        </TableCell>
                        <TableCell>$234.56</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            {/* Sidebar */}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
            sint aperiam error nihil non officiis itaque repellat dolor
            alias cupiditate, unde tempora saepe voluptates. Animi
            voluptatem adipisci eius earum laudantium.
          </div>
        </main>
      </div>
    </div>
  );
}
