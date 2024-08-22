import { BiTestTube } from "react-icons/bi";
import Button from "../Buttons";
import Modal from "../Modal";
import { Container, Footer, Header, Main, TitleWrapper } from "./style";
import { CgCloseO } from "react-icons/cg";
import { FindById, Update } from "../../../Domain/UseCases";
import { useCallback, useLayoutEffect, useState } from "react";
import { Exams } from "../../../Domain/Entities";
import { ExamStatus } from "../../../Domain/Entities/Exams";

type Props = {
  isVisible: boolean;
  diagnosisId: number;
  close(): void;
  findExam: FindById;
  updateExam: Update;
};

const initialState = {
  patientId: 0,
  name: "test",
  diagnosis: "",
  requisitionDate: new Date(),
  status: ExamStatus.DONE,
};

const Diagnosis: React.FC<Props> = ({
  isVisible,
  diagnosisId,
  close,
  findExam,
  updateExam,
}) => {
  const [exam, setExam] = useState<Exams>(initialState);

  const fetchExam = useCallback(async () => {
    setExam(await findExam.findById({ id: diagnosisId }));
  }, [diagnosisId, findExam]);

  useLayoutEffect(() => {
    fetchExam();
  }, [fetchExam]);

  async function handleConfirm() {
    if (exam.status === ExamStatus.DONE) {
      try {
        await updateExam.update({ data: exam });
      } catch (error) {
        console.error(error);
      } finally {
        await fetchExam();
        close();
      }
    }
  }

  function handleChange(value: string) {
    setExam((prev) => ({ ...prev, diagnosis: value }));
  }

  return (
    <Modal
      modalState={isVisible}
      children={
        <Container>
          <Header>
            <TitleWrapper>
              <BiTestTube size={40} color="#03a696" />
              <span>{exam?.name}</span>
            </TitleWrapper>
            <CgCloseO size={24} onClick={close} />
          </Header>
          <Main>
            <label>Diagnóstico:</label>
            <textarea
              value={exam?.diagnosis || ""}
              onChange={(e) => handleChange(e.target.value)}
            ></textarea>
          </Main>
          <Footer>
            <Button
              typeBtn={{ type: "button" }}
              typeStyle="back"
              handle={close}
            >
              Cancelar
            </Button>
            <Button
              typeBtn={{ type: "submit" }}
              typeStyle="submit"
              handle={handleConfirm}
              disabled={exam?.status !== ExamStatus.DONE}
            >
              Confirmar
            </Button>
          </Footer>
        </Container>
      }
    />
  );
};
export { Diagnosis };
