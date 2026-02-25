import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import type { Metadata, Viewport } from "next";
import { Head, Search } from "nextra/components";
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
import "@repo/ui/styles.layer.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
  title: {
    default: "Mantine DataTable Extended",
    template: "%s | Mantine DataTable Extended",
  },
  description:
    "Supercharge your data tables with powerful search, filtering, sorting, and URL state management. Built on top of Mantine DataTable with opinionated, production-ready components.",
  keywords: [
    "mantine",
    "datatable",
    "react",
    "typescript",
    "data-table",
    "table-component",
    "react-table",
    "nextjs",
    "server-side-rendering",
    "url-state-management",
  ],
  authors: [{ name: "Au Quoc Hoa", url: "https://hoaaq.dev" }],
  creator: "Au Quoc Hoa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mantine-datatable-extended.hoaaq.dev",
    siteName: "Mantine DataTable Extended",
    title: "Mantine DataTable Extended",
    description:
      "Supercharge your data tables with powerful search, filtering, sorting, and URL state management.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mantine DataTable Extended",
    description:
      "Supercharge your data tables with powerful search, filtering, sorting, and URL state management.",
    creator: "@hoaaq",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
                docsRepositoryBase="https://github.com/hoaaq/mantine-datatable-extended"
                editLink={false}
                footer={<AppFooter />}
                navbar={<AppHeader />}
                pageMap={await getPageMap()}
                search={<Search />}
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
