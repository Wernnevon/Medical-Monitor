import { useEffect, useState } from "react";
import { LuClipboardCheck, LuClipboardX } from "react-icons/lu";
import { BiTestTube } from "react-icons/bi";

import Table from "../../../../Components/Table";
import { DataFilter } from "../../../../Components/Filters";
import { handleFilter } from "../../../../Utils/filterAdpater";
import { Exams } from "../../../../../Domain/Entities";
import { ExamStatus } from "../../../../../Domain/Entities/Exams";
import { formmatDate } from "../../../../Utils/dateUtils";
import { ToastTypes } from "../../../../Hooks/useToast/ToastConfigs";
import { useToast } from "../../../../Hooks";
import { usePopup } from "../../../../Hooks/usePopup";
import Toggle from "../../../../Components/Toggle";
import { Delete, ListPagination } from "../../../../../Domain/UseCases";

type ExamTableData = {
  id: number;
  name: string;
  requisitionDate: string;
  realizationDate: string;
  status: string;
};

type Props = {
  patientId?: string;
  list: ListPagination;
  remove: Delete;
};

const pageSize = 5;

export const ExamList: React.FC<Props> = ({
  patientId = "0",
  list,
  remove,
}: Props) => {
  const [exams, setExams] = useState<ExamTableData[]>([]);
  const [filters, setFilters] = useState<ListPagination.Filter[]>([
    { key: "patientId", value: patientId },
  ]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [pagination, setPagination] = useState({
    totalEntries: 0,
    totalPages: 1,
  });

  const [page, setPage] = useState<number>(1);

  const addToast = useToast();
  const { showPopup } = usePopup();

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
    { name: "Situação", key: "status", type: "text" },
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
    list
      .listPagination({
        page,
        pageSize,
        filters,
        keywords,
      })
      .then(({ entries, totalEntries }: ListPagination.Response<Exams>) => {
        const list: ExamTableData[] = entries.map(
          ({ id, name, requisitionDate, realizationDate, status }) => ({
            id: id || 0,
            name,
            requisitionDate: formmatDate(requisitionDate),
            realizationDate: realizationDate
              ? formmatDate(realizationDate)
              : "-",
            status,
          })
        );
        setPagination((prev) => ({
          ...prev,
          totalEntries: totalEntries || 0,
          totalPages: Math.ceil(totalEntries / pageSize) || 0,
        }));
        setExams(list || []);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, keywords, page, addToast]);

  function deleteExam(examId: number) {
    const popupData = {
      data: {
        title: "Excluir exame?",
        message: `Tem certeza de que deseja excluir? Não há como desfazer esta ação!`,
      },
      onConfirm: () =>
        remove
          .delete({ ids: [examId] })
          .then(() => {
            addToast(
              "O exame foi apagado do histórico desse paciente",
              ToastTypes.SUCESS
            );
          })
          .catch(() => {
            addToast(
              "Não foi possível apagar o exame do histórico deste paciente, tente novamente mais tarde",
              ToastTypes.ERROR
            );
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
          changePage: setPage,
          actualPage: page,
          pageSize: pageSize,
          totalPages: pagination.totalPages,
          totalEntries: pagination.totalEntries,
        },
        navigateTo: "exames",
      }}
      kebabConfig={kebab}
    />
  );
};
