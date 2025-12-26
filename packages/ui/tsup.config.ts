import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    server: "src/data-table/server/index.ts",
  },
  format: ["esm"],
  outExtension() {
    return {
      js: ".mjs",
    };
  },
  dts: {
    resolve: true,
  },
  splitting: false,
  sourcemap: false,
  clean: true,
  external: [
    "react",
    "react-dom",
    "@mantine/core",
    "@mantine/hooks",
    "@mantine/dates",
    "mantine-datatable",
    "nuqs",
    "@tabler/icons-react",
    "dayjs",
    "clsx",
    "zod",
  ],
  treeshake: true,
  minify: true,
  esbuildOptions(options) {
    options.treeShaking = true;
    options.drop = ["console", "debugger"]; // Remove console/debugger in production
  },
  onSuccess: () => {
    // Manually ensure "use client" is at the top of index.mjs
    const indexPath = join(process.cwd(), "dist", "index.mjs");
    try {
      const content = readFileSync(indexPath, "utf-8");
      if (!content.startsWith(`"use client";`)) {
        writeFileSync(indexPath, `"use client";\n${content}`);
      }
    } catch (error) {
      console.warn("Could not add use client directive:", error);
    }
    return Promise.resolve();
  },
});
