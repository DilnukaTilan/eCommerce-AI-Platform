"use client";

import { SanityApp } from "@sanity/sdk-react";
import { dataset, projectId } from "@/sanity/env";

function SanityAppProvider({ children }: { children: React.ReactNode }) {
  return (
    <SanityApp
      config={[
        {
          projectId,
          dataset,
        },
      ]}
      fallback={<div />}
    >
      {children}
    </SanityApp>
  );
}

export default SanityAppProvider;
