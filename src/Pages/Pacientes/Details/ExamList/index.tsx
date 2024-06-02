import { useEffect, useState } from "react";
import { LuClipboardCheck, LuClipboardX } from "react-icons/lu";
import { BiTestTube } from "react-icons/bi";

import Table from "../../../../Components/Table";
import { List } from "../../../../Infra/Interfaces";
import { PaginationType } from "../../../../Components/Pagination";
import { DataFilter } from "../../../../Components/Filters";
import { handleFilter } from "../../../../Utils/filterAdpater";
import Exam, { ExamStatus } from "../../../../Infra/Entities/Exams";
import { makeLocalExamDelete, makeLocalExamList } from "../../../../Factories";
import { formmatDate } from "../../../../Utils/dateUtils";
import { ToastTypes } from "../../../../Hooks/useToast/ToastConfigs";
import { useToast } from "../../../../Hooks";
import { usePopup } from "../../../../Hooks/usePopup";
import Toggle from "../../../../Components/Toggle";

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

export const ExamList: React.FC<Props> = ({ patientId = "0" }: Props) => {
  const [exams, setExams] = useState<ExamTableData[]>([]);
  const [filters, setFilters] = useState<List.Filter[]>([
    { key: "patientId", value: patientId },
  ]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    pageSize: 5,
    totalEntries: 0,
    totalPages: 1,
  });

  const addToast = useToast();
  const { showPopup } = usePopup();

  const examList = makeLocalExamList();
  const examDelete = makeLocalExamDelete();

  const filterExamTable: DataFilter[] = [
    {
      type: "radio",
      placeholder: "Situação",
      handle: (filterValue: any) =>
        handleFilter({
          keyFilter: "done",
          filterValue,
          filterArray: filters,
          callback: setFilters,
        }),
      value: [
        { name: "done", value: ExamStatus.IN_PROGRESS },
        { name: "done", value: ExamStatus.DONE },
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
    { name: "Situação", key: "done", type: "text" },
    { name: "", key: "action", type: "action" },
  ];

  const kebab = [
    {
      icon: <LuClipboardCheck />,
      name: "Diagnótico",
      action: (id: number) => {
        console.log(`exame ${id}`);
      },
    },
    {
      icon: <Toggle />,
      name: "Mudar Situação",
      action: (id: number) => {
        console.log(`exame ${id}`);
      },
    },
    {
      icon: <LuClipboardX />,
      name: "Deletar",
      action: deleteExam,
    },
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
  }, [filters, keywords, pagination.page, addToast]);

  function handleChangePage(page: number) {
    setPagination((prev) => ({ ...prev, page }));
  }

  function deleteExam(examId: number) {
    const popupData = {
      data: {
        title: "Excluir exame?",
        message: `Tem certeza de que deseja excluir? Não há como desfazer esta ação!`,
      },
      onConfirm: () =>
        examDelete
          .delete({ id: examId })
          .then(() => {
            addToast("Paciente apagado", ToastTypes.SUCESS);
          })
          .catch(() => {
            addToast("Houve um problema", ToastTypes.ERROR);
          }),
    };
    showPopup(popupData);
  }

  return (
    <Table
      icon={<BiTestTube />}
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
        navigateTo: "exames",
      }}
      kebabConfig={kebab}
    />
  );
};
