import { PageLayout } from "@/components/core/layouts/page";
import { GlobalNavBar } from "@/components/custom/GlobalNavBar/GlobalNavBar";
import { NewsCard } from "@/components/custom/NewsCard/NewsCard";

const SymbolResearchPage = ({
  params,
}: {
  params: { symbol: string };
}) => {
  return (
    <PageLayout navInjection={[<GlobalNavBar />]}>
      <div className="grid grid-cols-4 gap-2">
        <div className="">
          <NewsCard symbol={params.symbol.toUpperCase()} />
        </div>
        <div className="h-[85dvh] col-span-3 bg-blue-400"></div>
      </div>
    </PageLayout>
  );
};

export default SymbolResearchPage;
