import React, { useState, useEffect } from 'react';

import Output from '../../Components/output';
import Dropdown from '../../Components/Dropdown';

import { 
  ExameCard,
  ExameContainer,
  ExameContent,
  LabelHeader,
  InputData,
  CheckoutContent,
  ExamesContent,
} from './styles';

interface Exames {
  type?: string;
  exames?: Array<string>;
}

const Exame: React.FC = () => {

  const Hormonio = ["TSH", "T3 Total", "T4 Total", "T3 Livre", "T4 Live", "FSH", "Prolactina", "Iget Total", "Beta HCG Quantitativo", "Beta HCG Qualitativo", "Progesterona", "Testosterona"];
  const Hematologia = ["Hemograma Completo", "Coagulograma", "Tempo de Protombina - TAPE", "Tempo de Tromboplastina", "Grupo sanguíneo fator RH", "VSH - Hemossedimentação", "Leucrograma", "Eritrograma", "Teste de Coombs - Direto", "Teste de Coombs - Indireto", "Contagem de Reticulócitos"];
  const Bioquimica = ["Glicose de Jejum", "Glicose pós Prandial", "Colesterol Total", "Colesterol HDL", "Colesterol LDL", "Colesterol VLDL", "Triglicérides", "Ácido Úrico", "Uréia", "Creatinina", "Transaminase TGP", "Transaminase TGO", "Bilirrubina Total e Frações", "Fosfatase Alcalina", "Gama GT", "DLH", "Amilase", "Sodio - NA", "Potássio - K", "Lítio - LI", "CPK"];
  const Imunologia = ["ASLO", "PCR", "Latex", "FTA ABS IGG", "FTA ABS IGM", "HIV", "Chagas Sorologia", "Chagas Imunofluorescência"];
  const Parasitologia = ["Parasitológico de Fezes", "MIF", "SWAB anal", "Parasitológico Seriado", "Pesquisa de Leucócitos e Leveduras", "Cropologia Funcional"];
  const Tumorais = ["CEA", "CA 125", "CA 19-9", "PSA Total", "PSA Livre"];
  const Microbiologia = ["Cultura de Sec. Orafaringe", "Cultura de Sec. Vaginal", "Cultura de Sec. Uretal", "Cultura de Sec. Purulenta", "Cultura de Sec. (Exsudatos)", "Bacterioscopia BK - BAAR - Escarro", "Baterioscopia - Gram"];
  const Urianalise = ["Sumário de Urina - EAS", "Urocultura - Cultura de Urina", "Proteína - Urina 24 Horas"];

  const exames: Array<Exames> = [
    {
      type: "Hormônio",
      exames: Hormonio,
    },
    {
      type: "Hematologia",
      exames: Hematologia,
    },
    {
      type: "Bioquímica",
      exames: Bioquimica,
    },
    {
      type: "Imunologia",
      exames: Imunologia,
    },
    {
      type: "Parasitologia",
      exames: Parasitologia,
    },
    {
      type: "Marcadores Tumorais",
      exames: Tumorais,
    },
    {
      type: "Microbiologia",
      exames: Microbiologia,
    },
    {
      type: "Urianálise",
      exames: Urianalise,
    }
  ]

  const [selected, setSelected] = useState([]);

  useEffect(()=>{
    setSelected(selected);
  }, [selected]);

  return (
    <ExameContainer>
      <ExameCard>
        <LabelHeader>Selecione os exames:</LabelHeader>
        <ExameContent>
          <CheckoutContent>
            <LabelHeader>Paciente:</LabelHeader>
            <InputData/>
          </CheckoutContent>
          <CheckoutContent>
            <LabelHeader>Idade:</LabelHeader>
            <InputData/>
          </CheckoutContent>
          <CheckoutContent>
            <LabelHeader>Convênio:</LabelHeader>
            <InputData/>
          </CheckoutContent>
          <CheckoutContent>
            <LabelHeader>Data:</LabelHeader>
            <InputData style={{width: "max-content"}} type="date"/>
          </CheckoutContent>
        </ExameContent>
        <ExamesContent>
          {
            exames.map(exame => 
              <Dropdown key={exame.type} setSelected={setSelected} type={exame.type} exames={exame.exames} />  
            )
          }
          <CheckoutContent style={{flexDirection: "column", alignItems: "start", width: "90%", marginTop:"10px"}}>
            <LabelHeader>Outros Exames:</LabelHeader>
            <InputData as="textarea" style={{width: "95%", minHeight: "60px", margin: 0, fontSize:"1rem", marginTop:"10px"}}/>
          </CheckoutContent>
        </ExamesContent>
      </ExameCard>
      <Output exames={selected} />
    </ExameContainer>
  );
}

export default Exame;