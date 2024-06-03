import { useEffect, useState } from "react";
import { LuClipboardEdit, LuClipboardX } from "react-icons/lu";

import Table from "../../../../Components/Table";
import { List } from "../../../../../Domain/UseCases";
import { PaginationType } from "../../../../Components/Pagination";
import { DataFilter } from "../../../../Components/Filters";
import { handleFilter } from "../../../../Utils/filterAdpater";
import {
  makeLocalPrescriptionDelete,
  makeLocalPrescriptionList,
} from "../../../../../Factories";
import { formmatDate } from "../../../../Utils/dateUtils";
import { Prescription } from "../../../../../Domain/Entities";
import { PrescriptionSatus } from "../../../../../Domain/Entities/Prescription";
import Toggle from "../../../../Components/Toggle";
import { useToast } from "../../../../Hooks";
import { usePopup } from "../../../../Hooks/usePopup";
import { ToastTypes } from "../../../../Hooks/useToast/ToastConfigs";

type PrecriptionTableData = {
  id: number;
  name: string;
  requisitionDate: string;
  status: string;
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

  const addToast = useToast();
  const { showPopup } = usePopup();

  const precriptionList = makeLocalPrescriptionList();
  const precriptionDelete = makeLocalPrescriptionDelete();

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
    { name: "Status", key: "status", type: "text" },
    { name: "", key: "action", type: "action" },
  ];

  const kebab = [
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

  function deleteExam(examId: number) {
    const popupData = {
      data: {
        title: "Excluir prescrição?",
        message: `Tem certeza de que deseja excluir? Não há como desfazer esta ação!`,
      },
      onConfirm: () =>
        precriptionDelete
          .delete({ id: examId })
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
            ({ id, medicament: name, date: requisitionDate, status }) => ({
              id: id || 0,
              name,
              requisitionDate: formmatDate(requisitionDate),
              status,
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
  }, [filters, keywords, pagination.page, addToast]);

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
      kebabConfig={kebab}
    />
  );
};
