import type { NextConfig } from "next";
import nextra from "nextra";

const withNextra = nextra({
  defaultShowCopyCode: true,
  contentDirBasePath: "/docs",
  search: {
    codeblocks: false,
  },
  latex: false,
});
const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  transpilePackages: ["@repo/ui"],
  experimental: {
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/hooks",
      "@mantine/dates",
    ],
  },
};

export default withNextra(nextConfig);
