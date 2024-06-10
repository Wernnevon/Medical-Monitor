import { useEffect, useState } from "react";
import { LuClipboardEdit, LuClipboardX } from "react-icons/lu";

import Table from "../../../../Components/Table";
import { DataFilter } from "../../../../Components/Filters";
import { handleFilter } from "../../../../Utils/filterAdpater";
import { formmatDate } from "../../../../Utils/dateUtils";
import { Prescription } from "../../../../../Domain/Entities";
import { PrescriptionSatus } from "../../../../../Domain/Entities/Prescription";
import Toggle from "../../../../Components/Toggle";
import { useToast } from "../../../../Hooks";
import { usePopup } from "../../../../Hooks/usePopup";
import { ToastTypes } from "../../../../Hooks/useToast/ToastConfigs";
import { Delete, ListPagination } from "../../../../../Domain/UseCases";

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
};

const pageSize = 5;

export const PrescriptionList: React.FC<Props> = ({
  patientId,
  list,
  remove,
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
