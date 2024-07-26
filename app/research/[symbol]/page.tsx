import { get } from "http";
import { Metadata } from "next";

import { getSymbolInfo } from "@/api/SymbolInfo/getSymbolInfo";
import { PageLayout } from "@/components/core/layouts/page";
import { GlobalNavBar } from "@/components/custom/GlobalNavBar/GlobalNavBar";
import { NewsCard } from "@/components/custom/NewsCard/NewsCard";
import { TimeSeriesChart } from "@/components/custom/TimeSeriesChart/TimeSeriesChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <div id="side-bar" className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              <h1>{params.symbol.toUpperCase()}</h1>
            </CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Excepturi rem nihil commodi cumque sequi ab nemo assumenda
              voluptatem animi eos neque quaerat a, repellendus placeat
              error! Sed dolores non in!
            </CardDescription>
          </CardHeader>
          <CardContent className="h-96"></CardContent>
        </Card>
        <NewsCard symbol={params.symbol.toUpperCase()} />
      </div>
      <div id="main-content" className="col-span-3">
        <TimeSeriesChart symbol={params.symbol.toUpperCase()} />
      </div>
    </PageLayout>
  );
};

export default SymbolResearchPage;
