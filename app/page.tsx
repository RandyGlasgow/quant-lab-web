import { BarChartIcon, BriefcaseIcon, PieChartIcon } from "lucide-react";
import Link from "next/link";

import { PageLayout } from "@/components/core/layouts/page";
import { GlobalNavBar } from "@/components/custom/GlobalNavBar/GlobalNavBar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <PageLayout navInjection={[<GlobalNavBar />]}>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Unlock the Power of Portfolio Research
              </h1>
              <p className="max-w-[600px] text-primary/70 md:text-xl">
                Discover the perfect investment opportunities with our
                cutting-edge portfolio research app. Analyze trends,
                compare assets, and make informed decisions.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                asChild
                className="transition-all duration-300 shadow-lg hover:text-yellow-400 hover:shadow-yellow-600 shadow-transparent"
              >
                <Link
                  href="#"
                  className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium transition-colors rounded-md shadow bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Get Started
                </Link>
              </Button>
              <Button
                className="bg-yellow-400"
                variant="secondary"
                asChild
              >
                <Link
                  href="#"
                  className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium transition-colors bg-white border rounded-md shadow-sm border-input hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
          <img
            src="/lightbulb.png"
            width="600"
            height="600"
            alt="Hero"
            className="object-cover mx-auto overflow-hidden aspect-square rounded-xl sm:w-full lg:order-last"
          />
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 text-sm bg-yellow-400 rounded-lg bg-muted text-primary">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
                Powerful Tools for Savvy Investors
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our portfolio research app offers a suite of advanced
                features to help you make informed investment decisions.
                Analyze trends, compare assets, and stay ahead of the
                curve.
              </p>
            </div>
          </div>
          <div className="grid items-center max-w-5xl gap-6 py-12 mx-auto lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold text-foreground">
                      Comprehensive Portfolio Analysis
                    </h3>
                    <p className="text-muted-foreground">
                      Dive deep into your portfolio's performance, risk
                      profile, and asset allocation.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold text-foreground">
                      Trend Tracking and Forecasting
                    </h3>
                    <p className="text-muted-foreground">
                      Stay ahead of the curve with real-time market
                      insights and predictive analytics.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold text-foreground">
                      Personalized Recommendations
                    </h3>
                    <p className="text-muted-foreground">
                      Get tailored investment suggestions based on your
                      unique goals and risk tolerance.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <img
              src="/disco.png"
              width="550"
              height="550"
              alt="Features"
              className="object-cover object-center mx-auto rounded-xl sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 text-sm bg-yellow-400 rounded-lg text-primary">
                Testimonials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
                What Our Users Say
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from real investors who have transformed their
                portfolios with our powerful research tools.
              </p>
            </div>
          </div>
          <div className="grid items-center max-w-5xl gap-6 py-12 mx-auto lg:grid-cols-2 lg:gap-12">
            <Card className="p-4 bg-white shadow-lg rounded-xl">
              <CardContent className="flex flex-col items-start justify-center gap-4">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-lg font-bold text-foreground">
                      John Doe
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Investor, 35
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "This app has completely transformed the way I manage
                  my\n investments. The insights and recommendations have
                  helped\n me achieve my financial goals with confidence."
                </p>
              </CardContent>
            </Card>
            <Card className="p-4 bg-white shadow-lg rounded-xl">
              <CardContent className="flex flex-col items-start justify-center gap-4">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-lg font-bold text-foreground">
                      Jane Smith
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Investor, 42
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "I've been using this app for the past year, and it's
                  been\n a game-changer. The data-driven insights have
                  helped me\n make more informed decisions and grow my
                  portfolio\n significantly."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-yellow-400 to-yellow-600">
        <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary">
                Start Your Journey to Financial Freedom
              </h2>
              <p className="max-w-[600px] text-primary/60 md:text-xl">
                Sign up for our portfolio research app and unlock the key
                to successful investing. Get started today and take control
                of your financial future.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="#"
                className="inline-flex items-center h-10 justify"
                prefetch={false}
              />
            </div>
          </div>
        </div>
      </section>
      Illustration(s) from{" "}
      <a href="https://absurd.design/">absurd.design</a>
    </PageLayout>
  );
}
