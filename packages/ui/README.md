# Mantine DataTable Extended

An extension library for [Mantine DataTable](https://icflorescu.github.io/mantine-datatable/), providing powerful and easy-to-use features for building data tables in React applications.

## Why this library?

Mantine and Mantine DataTable are excellent libraries, trusted and used by many developers. However, during use, I noticed some limitations:

- **Column toggling**: No dedicated component for managing column visibility
- **Multi-column sorting**: Can only sort by one column at a time
- **Search and Filter**: Not standardized, requiring full customization
- **Pagination**: Fixed to footer, causing issues with async data loading

## Key Features

### 🎯 Standardized Components

- **DteSearch**: Search with multi-column selection
- **DteFilter**: Filter data with various filter types (text, number, date, select, range...)
- **DteSortList**: Sort by multiple columns simultaneously
- **DteColumnsToggle**: Show/hide columns
- **DtePagination**: Flexible pagination that can be placed anywhere

### 🔗 URL State Management

- Uses [Nuqs](https://nuqs.dev/) to store state in URL
- Shareable links - share URLs with filters/search/sort applied
- SEO-friendly with SSR support
- Easy integration with server-side rendering

### 🚀 Server-Side Integration

- Next.js App Router support
- Server-side data prefetching
- Hybrid fetching with React Query
- Type-safe with TypeScript

### 🎨 Developer Experience

- Full TypeScript with type inference
- Consistent and easy-to-use API
- Customizable i18n for all text
- Flexible layout - arrange components as needed

## Installation

```bash
pnpm add mantine-datatable-extended mantine-datatable @mantine/dates dayjs nuqs zod
```

**Peer Dependencies:**

- `@mantine/core` >= 8.3
- `@mantine/dates` >= 8.3
- `@mantine/hooks` >= 8.3
- `@tabler/icons-react` >= 3.35
- `clsx` >= 2
- `dayjs` >= 1.11
- `mantine-datatable` >= 8.3
- `nuqs` >= 2.8
- `react` >= 19
- `react-dom` >= 19
- `zod` >= 4.1

## Quick Start

### Step 1: Setup Nuqs Adapter

This library uses Nuqs for managing query parameters. You need to wrap your app with Nuqs Adapter in your `app/layout.tsx` or `src/app/layout.tsx` file:

```tsx
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <NuqsAdapter>
          <MantineProvider>{children}</MantineProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
```

### Step 2: Create Data Table

```tsx
"use client";

import {
  DteExtended,
  DteProvider,
  DteSearch,
  DteFilter,
  DteSortList,
  DteColumnsToggle,
  DtePagination,
  type TDteColumnProps,
} from "mantine-datatable-extended";
import { useDataTableColumns } from "mantine-datatable";
import { Group, Space } from "@mantine/core";

const columns: TDteColumnProps[] = [
  {
    accessor: "name",
    title: "Name",
    extend: {
      searchable: true,
      sortable: true,
      filterable: true,
      filterVariant: "text",
    },
  },
  // ... more columns
];

export default function MyTable() {
  const originalUseDataTableColumnsResult = useDataTableColumns({
    key: "my-table",
    columns,
  });

  return (
    <DteProvider
      columns={columns}
      originalUseDataTableColumnsResult={originalUseDataTableColumnsResult}
      storeColumnsKey="my-table"
    >
      <Group justify="space-between">
        <Group>
          <DteSearch />
          <DteFilter />
        </Group>
        <Group>
          <DteSortList />
          <DteColumnsToggle />
        </Group>
      </Group>

      <Space h="md" />
      <DteExtended records={data} />
      <Space h="md" />
      <DtePagination />
    </DteProvider>
  );
}
```

## Documentation

For detailed documentation, examples, and API reference, please visit the [documentation website](https://your-docs-url.com).

## Important Note

This is an opinionated library built with many personal opinions to reduce customization time and achieve immediate results. Use it if you really need these features.

You can still use this library alongside the original Mantine DataTable without any conflicts.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
