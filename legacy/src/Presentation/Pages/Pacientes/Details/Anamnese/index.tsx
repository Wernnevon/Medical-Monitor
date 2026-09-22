import { useLayoutEffect, useState } from "react";
import {
  AnamneseInput,
  Container,
  FormWrapper,
  SubmitAnamnese,
  Title,
  TitleWrapper,
} from "./styles";

type Props = {
  anamnese: string;
};

export const Anamnese: React.FC<Props> = ({ anamnese }) => {
  const [value, setValue] = useState("");
  function onSubmit() {
    console.log(value);
  }

  useLayoutEffect(() => {
    setValue(anamnese);
  }, [anamnese]);

  return (
    <Container>
      <TitleWrapper>
        <Title>Anamnese</Title>
      </TitleWrapper>
      <FormWrapper>
        <AnamneseInput
          readOnly={anamnese.length > 0}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <SubmitAnamnese
          typeStyle="submit"
          disabled={anamnese.length > 0}
          handle={onSubmit}
        >
          Salvar
        </SubmitAnamnese>
      </FormWrapper>
    </Container>
  );
};
