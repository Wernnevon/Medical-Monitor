/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { LuClipboardCheck, LuClipboardX } from "react-icons/lu";
import { BiTestTube } from "react-icons/bi";
import { IoMdSwitch } from "react-icons/io";

import Table from "../../../../Components/Table";
import { DataFilter } from "../../../../Components/Filters";
import { handleFilter } from "../../../../Utils/filterAdpater";
import { Exams } from "../../../../../Domain/Entities";
import { ExamStatus } from "../../../../../Domain/Entities/Exams";
import { formmatDate } from "../../../../Utils/dateUtils";
import { ToastTypes } from "../../../../Hooks/useToast/ToastConfigs";
import { useToast } from "../../../../Hooks";
import { usePopup } from "../../../../Hooks/usePopup";
import {
  ChangeStatus,
  Delete,
  ListPagination,
} from "../../../../../Domain/UseCases";

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
  status: ChangeStatus;
};

const pageSize = 5;

export const ExamList: React.FC<Props> = ({
  patientId = "0",
  list,
  remove,
  status,
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
    { name: "Situação", key: "status", type: "text" },
    { name: "", key: "action", type: "action" },
  ];

  const kebab = [
    {
      icon: <LuClipboardCheck />,
      name: "Diagnóstico",
      action: (id: number) => {
        console.log(`exame ${id}`);
      },
    },
    {
      icon: <IoMdSwitch />,
      name: "Mudar Situação",
      action: changeStatus,
    },
    {
      icon: <LuClipboardX />,
      name: "Deletar",
      action: deleteExam,
    },
  ];

  async function fetchExams() {
    const response = await list.listPagination({
      page,
      pageSize,
      filters,
      keywords,
    });
    const { entries, totalEntries } = response;
    const examList: ExamTableData[] = entries.map(
      ({ id, name, requisitionDate, realizationDate, status }: Exams) => ({
        id: id || 0,
        name,
        requisitionDate: formmatDate(requisitionDate),
        realizationDate: realizationDate ? formmatDate(realizationDate) : "-",
        status,
      })
    );
    setPagination({
      totalEntries: totalEntries || 0,
      totalPages: Math.ceil(totalEntries / pageSize) || 0,
    });
    setExams(examList || []);
  }

  async function deleteExam(examId: number) {
    const popupData = {
      data: {
        title: "Excluir exame?",
        message: `Tem certeza de que deseja excluir? Não há como desfazer esta ação!`,
      },
      onConfirm: async () => {
        try {
          await remove.delete({ ids: [examId] });
          addToast(
            "O exame foi apagado do histórico desse paciente",
            ToastTypes.SUCESS
          );
          fetchExams();
        } catch {
          addToast(
            "Não foi possível apagar o exame do histórico deste paciente, tente novamente mais tarde",
            ToastTypes.ERROR
          );
        }
      },
    };
    showPopup(popupData);
  }

  async function changeStatus(examId: number) {
    const popupData = {
      data: {
        title: "Alterar situação do exame?",
        message: `Tem certeza de que deseja alterar a situação?`,
      },
      onConfirm: async () => {
        try {
          await status.changeStatus({ id: examId });
          addToast(
            "A atual situação do exame foi atualizada no histórico desse paciente",
            ToastTypes.SUCESS
          );
          fetchExams();
        } catch (err) {
          console.error(err);
          addToast(
            "Não foi possível mudar a atual situação do exame no histórico deste paciente, tente novamente mais tarde",
            ToastTypes.ERROR
          );
        }
      },
    };
    showPopup(popupData);
  }

  useEffect(() => {
    fetchExams();
  }, [filters, keywords, page]);

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
