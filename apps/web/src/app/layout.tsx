import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import type { Metadata, Viewport } from "next";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { Layout } from "nextra-theme-docs";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AppFooter } from "@/components/layout/footer";
import { AppHeader } from "@/components/layout/header";
import QueryProvider from "@/components/providers/query-provider";

import "../index.css";
import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.layer.css";
import "mantine-datatable/styles.layer.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
  title: "Mantine DataTable Extended",
  description: "Mantine DataTable Extended",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html dir="ltr" lang="en" {...mantineHtmlProps}>
      <Head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </Head>
      <body>
        <NuqsAdapter>
          <QueryProvider>
            <MantineProvider defaultColorScheme="dark">
              <Layout
                footer={<AppFooter />}
                navbar={<AppHeader />}
                pageMap={await getPageMap()}
              >
                {children}
              </Layout>
            </MantineProvider>
          </QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
