import { get } from "http";

import { getSymbolInfo } from "@/api/SymbolInfo/getSymbolInfo";
import { PageLayout } from "@/components/core/layouts/page";
import { GlobalNavBar } from "@/components/custom/GlobalNavBar/GlobalNavBar";
import { NewsCard } from "@/components/custom/NewsCard/NewsCard";
import { TimeSeriesChart } from "@/components/custom/TimeSeriesChart/TimeSeriesChart";

export async function generateMetadata({
  params,
}: {
  params: { symbol: string };
}) {
  const data = await getSymbolInfo(params.symbol.toUpperCase());
  return {
    title: `${params.symbol.toUpperCase()}: ${data.results?.name}`,
    description: data.results?.description,
    // set the favicon
    favicon: data.results?.branding?.icon_url,
  };
}
const SymbolResearchPage = ({
  params,
}: {
  params: { symbol: string };
}) => {
  return (
    <PageLayout
      navInjection={[<GlobalNavBar key={"global_nav_bar"} />]}
      className="flex flex-col-reverse gap-2 py-2 lg:grid-cols-4 lg:grid"
    >
      <div id="side-bar" className="">
        <NewsCard symbol={params.symbol.toUpperCase()} />
      </div>
      <div id="main-content" className="col-span-3">
        <TimeSeriesChart symbol={params.symbol.toUpperCase()} />
      </div>
    </PageLayout>
  );
};

export default SymbolResearchPage;
