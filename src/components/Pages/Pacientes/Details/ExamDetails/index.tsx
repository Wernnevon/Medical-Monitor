import React, { useState } from "react";
import { Exam, Prescription } from "../../../../../Infra/DAOarchive/model";
import { Container, Card, Title } from "./styles";

interface Props {
  exam?: Exam;
  prescription?: Prescription;
}

const ExamDetails: React.FC<Props> = ({ exam, prescription }: Props) => {

    const [medicamentStatus, setMedicamentStatus] = useState(prescription?.administering);
    const [examStatus, setExamStatus] = useState(exam?.done);
    const [realizationExamData, setRealizationExamData] = useState<Date>(new Date());

    function toggleMedicamentStatus(){
        setMedicamentStatus(!medicamentStatus);
    }
    function toggleExamStatus(){
        setExamStatus(!examStatus);
        setRealizationExamData(new Date());
    }

  return (
    <Container>
      {exam?.name && (
        <>
          <Title>{exam.name}</Title>
          <Card>
              <div>
                <label>Data de requisição:</label>
                <span>{new Date(exam.requisitionDate).toLocaleDateString()}</span>
              </div>
              {examStatus && (
                  <div>
                  <label>Data de realização:</label>
                  <span>{new Date(realizationExamData).toLocaleDateString()}</span>
                </div>
              )}
              <div>
                <label onClick={toggleExamStatus}>{examStatus ? 'Realizado' : 'Em Andamento'}</label>
              </div>
              <div>
                <label>Diagnóstico:</label>
                <span>{exam.diagnosis}</span>
              </div>
          </Card>
        </>
      )}
      {prescription?.medicament && (
        <>
          <Title>{prescription.medicament}</Title>
          <Card>
              <div>
                <label>Data de prescrição:</label>
                <span>{new Date(prescription.date).toLocaleDateString()}</span>
              </div>
              <div>
                <label onClick={toggleMedicamentStatus}>{!medicamentStatus ? 'Administrando' : 'Suspenso'}</label>
              </div>
          </Card>
        </>
      )}
    </Container>
  );
};
export default ExamDetails;
