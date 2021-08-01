import React, {useState, useEffect} from 'react';

import { 
    Exames,
    DropdownContainer,
    DropdownContent,
    Arrow,
    DropdownHeader,
    Checkbox,
    ContainerCheckbox,
    LabelCheckbox,
} from './styles';

interface Params {
    type?: string;
    exames?: Array<string>;
    setSelected?: any;
    selected?: Array<string>;
}

const Dropdown: React.FC<Params> = ({type, exames, setSelected}: Params) => {

  const [active, setActive] = useState(false);
  const [exame, setExame] = useState([]);


  function handleSelectExame(e: React.ChangeEvent<HTMLInputElement>){
   let value = e.target.value;
   let checked = e.target.checked;
   let examesSelecionados: any = exame;
   if(checked){
    //  console.log(examesSelecionados);
     if(examesSelecionados.includes(value)){
       console.log("exite");
       examesSelecionados = examesSelecionados.filter((e: string) => e !== value);
     } else {
       console.log("else")
       examesSelecionados.push(value);
     }
   }else{
    examesSelecionados = examesSelecionados!.filter((e: string) => e !== value);
    console.log('remove');
  }
  setExame(examesSelecionados);
  console.log(examesSelecionados.length);
  console.log(exame);
  //  setSelected(exame);
  }

  return (
    <DropdownContainer active={active} >
    <DropdownHeader active={active } 
      onClick={()=>setActive(!active)}>
      <Exames>{type}:</Exames>
      <Arrow active={active} />
    </DropdownHeader>
    <DropdownContent active={active}>
      {exames!.map(exame =>
        <ContainerCheckbox key={exame}>
          <Checkbox onChange={(e) => handleSelectExame(e)} value={exame} type="checkbox"/>
          <LabelCheckbox>{exame}</LabelCheckbox>
        </ContainerCheckbox>
      )}
    </DropdownContent>
  </DropdownContainer>
  );
}

export default Dropdown;