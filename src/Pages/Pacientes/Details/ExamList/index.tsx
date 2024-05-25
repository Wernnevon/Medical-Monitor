import { useEffect, useState } from "react";
import Table from "../../../../Components/Table";
import { List } from "../../../../Infra/Interfaces";
import { PaginationType } from "../../../../Components/Pagination";
import { DataFilter } from "../../../../Components/Filters";
import { handleFilter } from "../../../../Components/Utils/filterAdpater";
import Exam, { ExamStatus } from "../../../../Infra/Entities/Exams";
import { makeLocalExamList } from "../../../../Factories";
import { formmatDate } from "../../../../Components/Utils/dateUtils";

type ExamTableData = {
  id: number;
  name: string;
  requisitionDate: string;
  realizationDate: string;
  done: string;
};

type Props = {
  patientId?: string;
};

export const ExamList: React.FC<Props> = ({ patientId }: Props) => {
  const [exams, setExams] = useState<ExamTableData[]>([]);
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

  const examList = makeLocalExamList();

  const filterExamTable: DataFilter[] = [
    {
      type: "radio",
      placeholder: "Status",
      handle: (filterValue: any) =>
        handleFilter({
          keyFilter: "status",
          filterValue,
          filterArray: filters,
          callback: setFilters,
        }),
      value: [
        { name: "status", value: ExamStatus.IN_PROGRESS },
        { name: "status", value: ExamStatus.DONE },
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
    { name: "Exame", key: "name", type: "text" },
    { name: "Requisição", key: "requisitionDate", type: "text" },
    { name: "Realização", key: "realizationDate", type: "text" },
    { name: "Status", key: "done", type: "text" },
    { name: "", key: "action", type: "action" },
  ];

  useEffect(() => {
    examList
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
          records: Exam[];
        }) => {
          const list: ExamTableData[] = records.map(
            ({ id, name, requisitionDate, realizationDate, done }) => ({
              id: id || 0,
              name,
              requisitionDate: formmatDate(requisitionDate),
              realizationDate: realizationDate
                ? formmatDate(realizationDate)
                : "-",
              done,
            })
          );
          setPagination((prev) => ({
            ...prev,
            totalEntries: totalRecords || 0,
            totalPages: Math.ceil(totalRecords / pagination.pageSize) || 0,
          }));
          setExams(list || []);
        }
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, keywords, pagination.page]);

  function handleChangePage(page: number) {
    setPagination((prev) => ({ ...prev, page }));
  }

  return (
    <Table
      title="Exames"
      columns={columnsData}
      data={exams}
      filters={filterExamTable}
      config={{
        pagination: {
          entityName: "Exames",
          changePage: handleChangePage,
          actualPage: pagination.page,
          pageSize: pagination.pageSize,
          totalPages: pagination.totalPages,
          totalEntries: pagination.totalEntries,
        },
        navigateTo: "exam",
      }}
      kebabConfig={undefined}
    />
  );
};
