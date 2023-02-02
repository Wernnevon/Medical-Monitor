import React, {useState} from "react";

import Output from "../../Components/output";

import {
  AtestadoCard,
  AtestadoContainer,
  AtestadoCardOutput,
  FormContainer,
  Input,
  Item,
  Label,
  TitleForm
} from "./styles";

const Atestado: React.FC = () => {

  const [patientName, setPatientName] = useState('__________________');
  const [CID, setCID] = useState('__________________');
  const [days, setDays] = useState('1');
  const [date, setDate] = useState(new Date());
  const [city, setCity] = useState('Cidade');
  const [state, setState] = useState('UF');

  function handleDate(date: string){
    let result = new Date(date);

    result.setDate(result.getDate() + 1);
    setDate(result)
  }
  function handleDay(days: string){   
    if(parseInt(days) < 1 || days === ''){
      setDays('1');
    }else{
      setDays(days.toString())
    }
  }

  return (
    <AtestadoContainer>
      <AtestadoCard>
        <FormContainer>
          <TitleForm>Dados do Paciente</TitleForm>
          <Item>
            <Label>Paciente:</Label>
            <Input onChange={(event) => setPatientName(event.target.value.toLocaleUpperCase())} />
          </Item>
          <Item>
            <Label>Entidade Nosocológica-CID:</Label>
            <Input onChange={(event: any) => setCID(event.target.value)} />
          </Item>
          <Item>
            <Label>Dias:</Label>
            <Input value={days} onChange={(event) => handleDay(event.target.value)} type="number" min="01" />
          </Item>
          <Item >
            <Label>Data:</Label>
            <Input defaultValue={date.toISOString().substr(0,10)} onChange={(event) => handleDate(event.target.value)} type="date" />
          </Item>
          <Item>
            <Label>Cidade:</Label>
            <Input onChange={(event) => setCity(event.target.value)} type="text"/>
          </Item>
          <Item>
            <Label>UF:</Label>
            <Input onChange={(event) => setState(event.target.value)} type="text"/>
          </Item>
        </FormContainer>
      </AtestadoCard>
      <AtestadoCardOutput><Output atestado={{patientName, CID, days: parseInt(days), date, city, state}} /></AtestadoCardOutput>
    </AtestadoContainer>
  );
};

export default Atestado;
