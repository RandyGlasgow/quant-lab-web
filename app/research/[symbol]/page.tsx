import { PageLayout } from "@/components/core/layouts/page";
import { GlobalNavBar } from "@/components/custom/GlobalNavBar/GlobalNavBar";
import { NewsCard } from "@/components/custom/NewsCard/NewsCard";
import { TimeSeriesChart } from "@/components/custom/TimeSeriesChart/TimeSeriesChart";

const SymbolResearchPage = ({
  params,
}: {
  params: { symbol: string };
}) => {
  return (
    <PageLayout
      navInjection={[<GlobalNavBar key={"global_nav_bar"} />]}
      className="grid grid-cols-4 gap-2"
    >
      <div id="side-bar" className="">
        <NewsCard symbol={params.symbol.toUpperCase()} />
      </div>
      <div id="main-content" className="h-[85dvh] col-span-3">
        <TimeSeriesChart symbol={params.symbol.toUpperCase()} />
      </div>
    </PageLayout>
  );
};

export default SymbolResearchPage;
