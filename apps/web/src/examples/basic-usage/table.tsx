"use client";

import {
  DataTableExtended,
  type DataTableExtendedColumnProps,
  DataTableProvider,
} from "@repo/ui";
import { useDataTableColumns } from "mantine-datatable";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

const data: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    address: "123 Main St, Anytown, USA",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "0987654321",
    address: "456 Main St, Anytown, USA",
  },
  {
    id: "3",
    name: "Jim Doe",
    email: "jim.doe@example.com",
    phone: "1112223333",
    address: "789 Main St, Anytown, USA",
  },
  {
    id: "4",
    name: "Jill Doe",
    email: "jill.doe@example.com",
    phone: "4445556666",
    address: "101 Main St, Anytown, USA",
  },
  {
    id: "5",
    name: "Jack Doe",
    email: "jack.doe@example.com",
    phone: "7778889999",
    address: "123 Main St, Anytown, USA",
  },
];

export default function DataTable() {
  const columns: DataTableExtendedColumnProps<Customer>[] = [
    {
      accessor: "name",
      title: "Name",
    },
    {
      accessor: "email",
      title: "Email",
    },
    {
      accessor: "phone",
      title: "Phone",
    },
    {
      accessor: "address",
      title: "Address",
    },
  ];

  const originalUseDataTableColumnsResult = useDataTableColumns({
    key: "example",
    columns,
  });

  return (
    <DataTableProvider
      columns={columns}
      originalUseDataTableColumnsResult={originalUseDataTableColumnsResult}
      storeColumnsKey="example"
    >
      <DataTableExtended records={data} />
    </DataTableProvider>
  );
}
