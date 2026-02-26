import { Group, NativeSelect, Pagination, Space, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDteQueryParams } from "../hooks";
import { useDteContext } from "../provider";

type TDtePaginationProps = {
  recordsPerPageOptions?: number[];
};

export function DtePagination({
  recordsPerPageOptions = [10, 20, 30, 40, 50],
}: TDtePaginationProps) {
  const { page, pageSize, setPage, setPageSize } = useDteQueryParams();
  const { paginationProps, i18n } = useDteContext();
  const { totalRecords } = paginationProps || {};

  const [totalPages, setTotalPages] = useState(0);
  const [{ startRecord, endRecord }, setStartEndRecord] = useState({
    startRecord: 0,
    endRecord: 0,
  });

  useEffect(() => {
    setTotalPages(
      Math.ceil(
        (totalRecords || 0) /
          (pageSize ? pageSize : (recordsPerPageOptions[0] ?? 10))
      )
    );
  }, [totalRecords, pageSize, recordsPerPageOptions]);

  useEffect(() => {
    setStartEndRecord({
      startRecord: (page - 1) * pageSize + 1,
      endRecord: Math.min(page * pageSize, totalRecords || 0),
    });
  }, [page, pageSize, totalRecords]);

  return (
    totalPages > 0 && (
      <Group align="center" justify="space-between">
        <Group>
          <Text size="sm">
            {i18n.pagination.startEndRecordOfTotalRecords[0]} {startRecord}{" "}
            {i18n.pagination.startEndRecordOfTotalRecords[1]} {endRecord}{" "}
            {i18n.pagination.startEndRecordOfTotalRecords[2]} {totalRecords}
          </Text>
        </Group>
        <Group>
          <Text size="sm">{i18n.pagination.rowsPerPage}</Text>
          <NativeSelect
            data={recordsPerPageOptions.map((option) => ({
              label: option.toString(),
              value: option.toString(),
            }))}
            onChange={(event) => setPageSize(Number(event.target.value))}
            size="xs"
            value={pageSize}
            w={70}
          />
          <Space w="md" />
          <Text size="sm">
            {i18n.pagination.pageOfTotalPages[0]} {page}{" "}
            {i18n.pagination.pageOfTotalPages[1]} {totalPages}
          </Text>
          <Pagination
            onChange={(value) => setPage(value)}
            size="sm"
            total={totalPages}
            value={page}
            withControls
            withEdges
          />
        </Group>
      </Group>
    )
  );
}
