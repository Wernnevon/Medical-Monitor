/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";

import {
  PacienteContainer,
  PacienteCard,
  ListPatient,
  PatientSection,
} from "./styles";
import Table from "../../../Components/Table";
import { makeLocalPatientList } from "../../../Factories";
import { Patient } from "../../../Infra/Entities";
import { List } from "../../../Infra/Interfaces";
import { useNavigate } from "react-router-dom";

const Paciente: React.FC = () => {
  const patientList = makeLocalPatientList();
  const navigate = useNavigate();

  const [pacientes, setPacientes] = useState<Patient[]>([]);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<{
    totalEntries: number;
    totalPages: number;
  }>({ totalEntries: 0, totalPages: 0 });
  const [filters, setFilters] = useState<List.Filter[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);

  const [filtersData, setFiltersData] = useState<any>({});

  const kebabConfigs = [
    {
      icon: <FaUserEdit />,
      name: "Editar",
      action: (id: number) => {
        navigate(`editar/${id}`);
      },
    },
    {
      icon: <TbListDetails />,
      name: "Ver detalhes",
      action: (id: number) => {
        navigate(`detalhes/${id}`);
      },
    },
  ];

  useEffect(() => {
    patientList
      .listPerPage({
        page,
        pageSize: 10,
        keywords,
        filters,
      })
      .then((data) => {
        setPacientes(data.records || []);
        setPagination({
          totalEntries: data.totalRecords || 0,
          totalPages: Math.ceil(data.totalRecords / 10) || 0,
        });
      });
  }, [page, filters, keywords]);

  useEffect(() => {
    const cityMap = new Map();
    const healthInsuranceMap = new Map();
    patientList.listAll().then((value) => {
      value.forEach(({ adress: { city }, health: { healthInsurance } }) => {
        cityMap.set(city, city);
        healthInsuranceMap.set(healthInsurance, healthInsurance);
      });
      setFiltersData({
        insurance: [
          ...Array.from(healthInsuranceMap, ([, value]) => ({
            name: "healthInsurance",
            value,
          })),
        ],
        city: [
          ...Array.from(cityMap, ([, value]) => ({ name: "city", value })),
        ],
      });
    });
  }, []);

  return (
    <PacienteContainer>
      <PacienteCard>
        <PatientSection>
          <ListPatient>
            <Table
              data={pacientes.map(
                ({
                  id,
                  name,
                  adress: { city },
                  health: { healthInsurance },
                }) => ({ id, name, city, healthInsurance })
              )}
              columns={[
                { name: "Paciente", key: "name", type: "text" },
                { name: "Cidade", key: "city", type: "text" },
                { name: "Convênio", key: "healthInsurance", type: "text" },
                { name: "", key: "action", type: "action" },
              ]}
              filters={[
                {
                  placeholder: "Convenio",
                  type: "radio",
                  handle: (v) => {
                    const filtersMap = new Map(
                      filters.map(({ key, value }) => [key, value])
                    );
                    if (v) filtersMap.set("healthInsurance", v);
                    else filtersMap.delete("healthInsurance");

                    const filtersArray = Array.from(
                      filtersMap,
                      ([key, value]) => ({
                        key,
                        value,
                      })
                    );
                    setFilters(filtersArray);
                  },
                  value: filtersData.insurance,
                },
                {
                  placeholder: "Cidade",
                  type: "radio",
                  handle: (v) => {
                    const filtersMap = new Map(
                      filters.map(({ key, value }) => [key, value])
                    );
                    if (v) filtersMap.set("city", v);
                    else filtersMap.delete("city");

                    const filtersArray = Array.from(
                      filtersMap,
                      ([key, value]) => ({
                        key,
                        value,
                      })
                    );
                    setFilters(filtersArray);
                  },
                  value: filtersData.city,
                },
                {
                  placeholder: "Buscar",
                  type: "text",
                  handle: (v: string) => {
                    setKeywords(v.split(" "));
                  },
                },
              ]}
              config={{
                columnWidth: ["40%", "27.5%", "27.5%", "5%"],
                columnAlign: ["left", "left", "left", "center"],
                pagination: {
                  changePage: setPage,
                  actualPage: page,
                  totalPages: pagination.totalPages,
                  totalEntries: pagination.totalEntries,
                },
                navigateTo: "novo",
              }}
              kebabConfig={kebabConfigs}
            />
          </ListPatient>
        </PatientSection>
      </PacienteCard>
    </PacienteContainer>
  );
};

export default Paciente;
