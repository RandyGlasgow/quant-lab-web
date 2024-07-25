import { Car } from "lucide-react";

import { PageLayout } from "@/components/core/layouts/page";
import { GlobalNavBar } from "@/components/custom/GlobalNavBar/GlobalNavBar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SymbolResearch() {
  return (
    <PageLayout navInjection={[<GlobalNavBar />]}>
      <div className="grid grid-cols-4">
        <div className=""></div>
        <div className="h-screen col-span-3 bg-blue-400"></div>
      </div>
    </PageLayout>
  );
}
