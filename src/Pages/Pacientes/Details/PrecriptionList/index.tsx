import { useEffect, useState } from "react";
import Table from "../../../../Components/Table";
import { List } from "../../../../Infra/Interfaces";
import { PaginationType } from "../../../../Components/Pagination";
import { DataFilter } from "../../../../Components/Filters";
import { handleFilter } from "../../../../Utils/filterAdpater";
import { makeLocalPrescriptionList } from "../../../../Factories";
import { formmatDate } from "../../../../Utils/dateUtils";
import { Prescription } from "../../../../Infra/Entities";
import { PrescriptionSatus } from "../../../../Infra/Entities/Prescription";
import { LuClipboardEdit } from "react-icons/lu";

type PrecriptionTableData = {
  id: number;
  name: string;
  requisitionDate: string;
  administering: string;
};

type Props = {
  patientId?: string;
};

export const PrecriptionList: React.FC<Props> = ({ patientId }: Props) => {
  const [prescription, setPrescription] = useState<PrecriptionTableData[]>([]);
  const [filters, setFilters] = useState<List.Filter[]>([
    { key: "patientId", value: patientId || "0" },
  ]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    pageSize: 5,
    totalEntries: 0,
    totalPages: 1,
  });

  const precriptionList = makeLocalPrescriptionList();

  const filterPrescriptionTable: DataFilter[] = [
    {
      type: "radio",
      placeholder: "Status",
      handle: (filterValue: any) =>
        handleFilter({
          keyFilter: "administering",
          filterValue,
          filterArray: filters,
          callback: setFilters,
        }),
      value: [
        { name: "administering", value: PrescriptionSatus.ADMINISTERING },
        { name: "administering", value: PrescriptionSatus.SUSPENDED },
      ],
    },
    {
      placeholder: "Buscar",
      type: "text",
      handle: (v: string) => {
        setKeywords(v.split(" "));
      },
    },
  ];

  const columnsData = [
    { name: "Medicação", key: "name", type: "text" },
    { name: "Requisição", key: "requisitionDate", type: "text" },
    { name: "Status", key: "administering", type: "text" },
    { name: "", key: "action", type: "action" },
  ];

  useEffect(() => {
    precriptionList
      .listPerPage({
        page: pagination.page,
        pageSize: pagination.pageSize,
        filters,
        keywords,
      })
      .then(
        ({
          totalRecords,
          records,
        }: {
          totalRecords: number;
          records: Prescription[];
        }) => {
          const list: PrecriptionTableData[] = records.map(
            ({
              id,
              medicament: name,
              date: requisitionDate,
              administering,
            }) => ({
              id: id || 0,
              name,
              requisitionDate: formmatDate(requisitionDate),
              administering,
            })
          );
          setPagination((prev) => ({
            ...prev,
            totalEntries: totalRecords || 0,
            totalPages: Math.ceil(totalRecords / pagination.pageSize) || 0,
          }));
          setPrescription(list || []);
        }
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, keywords, pagination.page]);

  function handleChangePage(page: number) {
    setPagination((prev) => ({ ...prev, page }));
  }

  return (
    <Table
      icon={<LuClipboardEdit />}
      title="Prescrições"
      columns={columnsData}
      data={prescription}
      filters={filterPrescriptionTable}
      config={{
        pagination: {
          entityName: "Prescrições",
          changePage: handleChangePage,
          actualPage: pagination.page,
          pageSize: pagination.pageSize,
          totalPages: pagination.totalPages,
          totalEntries: pagination.totalEntries,
        },
        navigateTo: "receitas",
      }}
      kebabConfig={undefined}
    />
  );
};
