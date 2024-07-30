import { Metadata } from 'next';

import { getSymbolInfo } from '@/api/SymbolInfo/getSymbolInfo';
import { getSymbolSnapshot } from "@/api/SymbolInfo/getSymbolSnapshot";
import { NewsCard } from "@/app/research/[symbol]/components/NewsCard/NewsCard";
import { TimeSeriesChartClient } from "@/app/research/[symbol]/components/TimeSeriesChart/TimeSeriesChart";
import { PageContent } from "@/components/core/layouts/PageContent";
import { PageLayout } from "@/components/core/layouts/PageLayout";
import { GlobalNavBar } from '@/components/custom/GlobalNavBar/GlobalNavBar';
import { getTickerInformation } from "@/lib/api/getTickerInformation";
import { numValOrFallback } from "@/lib/utils";

import { PageHero } from "./components/PageHero/PageHero";

export async function generateMetadata({
  params,
}: {
  params: { symbol: string };
}): Promise<Metadata> {
  const data = await getSymbolInfo(params.symbol.toUpperCase());
  return {
    title: `${params.symbol.toUpperCase()}: ${data.results?.name}`,
    description: data.results?.description,
    keywords: data.results?.type,
    // add image
    // add favicon

    openGraph: {
      images: [
        {
          url: data.results?.branding?.logo_url ?? "",
          width: 800,
          height: 600,
          alt: `${params.symbol.toUpperCase()}: ${data.results?.name}`,
        },
      ],
    },
  };
}
const SymbolResearchPage = async ({
  params,
}: {
  params: { symbol: string };
}) => {
  const upperCaseSymbol = params.symbol.toUpperCase();

  return (
    <PageLayout navInjection={[<GlobalNavBar key={"global_nav_bar"} />]}>
      <PageHero symbol={upperCaseSymbol} />
      <PageContent>
        <div className="flex flex-col-reverse gap-2 py-2 lg:grid-cols-4 lg:grid">
          <div id="side-bar" className="flex flex-col gap-4">
            <NewsCard symbol={upperCaseSymbol} />
          </div>
          <div id="main-content" className="col-span-3">
            <TimeSeriesChartClient symbol={upperCaseSymbol} />
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
};

export default SymbolResearchPage;
