import { Search } from "lucide-react";
import { FC } from "react";

import { Input } from "@/components/ui/input";

export const SearchBar: FC = () => {
  return (
    <div className="relative flex-1 ml-auto md:grow-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
      />
    </div>
  );
};
