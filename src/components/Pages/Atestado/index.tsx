import React, {useState} from "react";

import Output from "../../Components/output";

import {
  AtestadoCard,
  AtestadoContainer,
  AtestadoCardOutput,
  FormContainer,
  Input,
  Item,
  Label
} from "./styles";

const Atestado: React.FC = () => {

  const [paciente, setPaciente] = useState('__________________');
  const [cid, setCID] = useState('__________________');
  const [dia, setDias] = useState('3');
  const [date, setDate] = useState(new Date());

  function handleDate(date: string){
    let result = new Date(date);
    result.setDate(result.getDate() + 1);
    setDate(result)
  }
  function handleDay(days: string){
    
    if(parseInt(days) < 1){
      setDias('1');
    }else{
      setDias(days.toString())
    }
  }

  return (
    <AtestadoContainer>
      <AtestadoCard>
        <FormContainer>
          <Item>
            <Label>Paciente:</Label>
            <Input onChange={(event: any) => setPaciente(event.target.value.toLocaleUpperCase())} />
          </Item>
          <Item>
            <Label>Entidade Nosocológica-CID:</Label>
            <Input onChange={(event: any) => setCID(event.target.value)} />
          </Item>
          <Item>
            <Label>Dias:</Label>
            <Input onChange={(event: any) => handleDay(event.target.value)} type="number" min="01" />
          </Item>
          <Item>
            <Label>Data:</Label>
            <Input onChange={(event: any) => handleDate(event.target.value)} type="date" max={Date.now()} />
          </Item>
        </FormContainer>
      </AtestadoCard>
      <AtestadoCardOutput><Output atestado={{paciente, cid, dia, date}} /></AtestadoCardOutput>
    </AtestadoContainer>
  );
};

export default Atestado;
