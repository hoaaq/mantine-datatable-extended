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
    const cwd = process.cwd();
    const distDir = join(cwd, "dist");

    // Manually ensure "use client" is at the top of index.mjs
    const indexPath = join(distDir, "index.mjs");
    try {
      const content = readFileSync(indexPath, "utf-8");
      if (!content.startsWith(`"use client";`)) {
        writeFileSync(indexPath, `"use client";\n${content}`);
      }
    } catch (error) {
      console.warn("Could not add use client directive:", error);
    }

    // Create layered CSS for cascade layer support
    writeFileSync(
      join(distDir, "styles.layer.css"),
      '@import "./index.css" layer(mantine-datatable-extended);\n'
    );

    return Promise.resolve();
  },
});
