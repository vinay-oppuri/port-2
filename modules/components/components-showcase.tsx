"use client";

import { componentsData } from "@/data/components-data";
import { ShowcaseHeader } from "./showcase/showcase-header";
import { ShowcaseTabs } from "./showcase/showcase-tabs";
import { ShowcaseInstallation } from "./showcase/showcase-installation";
import { ShowcaseUsage } from "./showcase/showcase-usage";
import { ShowcaseApi } from "./showcase/showcase-api";

export function ComponentsShowcaseClient({
  componentId,
  componentCode,
  demoCode,
  children,
}: {
  componentId: string;
  componentCode: string;
  demoCode: string;
  children?: React.ReactNode;
}) {
  const activeComponent = componentsData.find((c) => c.id === componentId) || componentsData[0];

  return (
    <div className="flex flex-col gap-6 w-full text-foreground max-w-5xl mx-auto p-2">
      <ShowcaseHeader component={activeComponent} />

      <ShowcaseTabs component={activeComponent} demoCode={demoCode}>
        {children}
      </ShowcaseTabs>

      <div className="flex flex-col gap-14 mt-8 w-full pb-16">
        <ShowcaseInstallation component={activeComponent} componentCode={componentCode} />
        {/* <ShowcaseUsage component={activeComponent} /> */}
        {/* <ShowcaseApi component={activeComponent} /> */}
      </div>
    </div>
  );
}
