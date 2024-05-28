import React, { useState } from "react";
import { useExame } from "../../Hooks/useExam/ExameContext";

import {
  Exames,
  DropdownContainer,
  DropdownContent,
  Arrow,
  DropdownHeader,
  Checkbox,
  ContainerCheckbox,
  LabelCheckbox,
} from "./styles";

interface Params {
  type?: string;
  exames?: Array<string>;
}

const Dropdown: React.FC<Params> = ({ type, exames }: Params) => {
  const [active, setActive] = useState(false);
  const { handleSelectExame } = useExame();

  return (
    <DropdownContainer active={active}>
      <DropdownHeader active={active} onClick={() => setActive(!active)}>
        <Exames>{type}:</Exames>
        <Arrow active={active} />
      </DropdownHeader>
      <DropdownContent active={active}>
        {exames!.map((exame) => (
          <ContainerCheckbox key={exame}>
            <Checkbox
              id={exame}
              onChange={(e) => handleSelectExame(e.target.value)}
              value={exame}
              type="checkbox"
            />
            <LabelCheckbox htmlFor={exame}>{exame}</LabelCheckbox>
          </ContainerCheckbox>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default Dropdown;
