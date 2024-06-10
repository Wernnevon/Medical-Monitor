import { useEffect, useState } from "react";
import { LuClipboardEdit, LuClipboardX } from "react-icons/lu";
import { IoMdSwitch } from "react-icons/io";

import Table from "../../../../Components/Table";
import { DataFilter } from "../../../../Components/Filters";
import { handleFilter } from "../../../../Utils/filterAdpater";
import { formmatDate } from "../../../../Utils/dateUtils";
import { Prescription } from "../../../../../Domain/Entities";
import { PrescriptionStatus } from "../../../../../Domain/Entities/Prescription";
import { useToast } from "../../../../Hooks";
import { usePopup } from "../../../../Hooks/usePopup";
import { ToastTypes } from "../../../../Hooks/useToast/ToastConfigs";
import {
  ChangeStatus,
  Delete,
  ListPagination,
} from "../../../../../Domain/UseCases";

type PrecriptionTableData = {
  id: number;
  name: string;
  requisitionDate: string;
  status: string;
};

type Props = {
  patientId?: string;
  list: ListPagination;
  remove: Delete;
  status: ChangeStatus;
};

const pageSize = 5;

export const PrescriptionList: React.FC<Props> = ({
  patientId,
  list,
  remove,
  status,
}: Props) => {
  const [prescription, setPrescription] = useState<PrecriptionTableData[]>([]);
  const [filters, setFilters] = useState<ListPagination.Filter[]>([
    { key: "patientId", value: patientId || "0" },
  ]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [pagination, setPagination] = useState({
    totalEntries: 0,
    totalPages: 1,
  });

  const [page, setPage] = useState<number>(1);

  const addToast = useToast();
  const { showPopup } = usePopup();

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
        { name: "administering", value: PrescriptionStatus.ADMINISTERING },
        { name: "administering", value: PrescriptionStatus.SUSPENDED },
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
    { name: "Status", key: "status", type: "text" },
    { name: "", key: "action", type: "action" },
  ];

  const kebab = [
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

  function deleteExam(examId: number) {
    const popupData = {
      data: {
        title: "Excluir prescrição?",
        message: `Tem certeza de que deseja excluir? Não há como desfazer esta ação!`,
      },
      onConfirm: () =>
        remove
          .delete({ ids: [examId] })
          .then(() => {
            addToast(
              "A medicação foi apagada do histórico desse paciente",
              ToastTypes.SUCESS
            );
          })
          .catch(() => {
            addToast(
              "Não foi possível apagar a medicação do histórico deste paciente, tente novamente mais tarde",
              ToastTypes.ERROR
            );
          }),
    };
    showPopup(popupData);
  }

  function changeStatus(examId: number) {
    const popupData = {
      data: {
        title: "Alterar situação?",
        message: `Tem certeza de que deseja alterar a situação?`,
      },
      onConfirm: () =>
        status
          .changeStatus({ id: examId })
          .then(() => {
            addToast(
              "A atual situação do do tratamento com farmaco foi atualizada no histórico desse paciente",
              ToastTypes.SUCESS
            );
          })
          .catch((err) => {
            console.error(err);
            addToast(
              "Não foi possível mudar a atual situação do tratamento com farmaco no histórico deste paciente, tente novamente mais tarde",
              ToastTypes.ERROR
            );
          }),
    };
    showPopup(popupData);
  }

  useEffect(() => {
    list
      .listPagination({
        page: page,
        pageSize,
        filters,
        keywords,
      })
      .then(
        ({ entries, totalEntries }: ListPagination.Response<Prescription>) => {
          const list: PrecriptionTableData[] = entries.map(
            ({ id, medicament: name, date: requisitionDate, status }) => ({
              id: id || 0,
              name,
              requisitionDate: formmatDate(requisitionDate),
              status,
            })
          );
          setPagination((prev: any) => ({
            ...prev,
            totalEntries: totalEntries || 0,
            totalPages: Math.ceil(totalEntries / pageSize) || 0,
          }));
          setPrescription(list || []);
        }
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, keywords, page, addToast]);

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
          changePage: setPage,
          actualPage: page,
          pageSize: pageSize,
          totalPages: pagination.totalPages,
          totalEntries: pagination.totalEntries,
        },
        navigateTo: "receitas",
      }}
      kebabConfig={kebab}
    />
  );
};
