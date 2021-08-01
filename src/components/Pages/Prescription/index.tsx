import React, { useState } from 'react';

import Output from '../../Components/output';

import { 
  ReceitaCard,
  ReceitaContainer,
  LabelHeader,
  Receituario,
  ReceituarioContainer,
} 
  
  from './styles';

const Prescription: React.FC = () => {

  const [content, setContent] = useState([]);

  function handleContent(value: any){
    setContent(value.target.value.split("\n"));
    console.log(content);
  }

  return (
    <ReceitaContainer>
      <ReceitaCard>
        <ReceituarioContainer>
          <LabelHeader>Informe as medicações:</LabelHeader>
          <Receituario onChange={(text) => handleContent(text)} />
        </ReceituarioContainer>
      </ReceitaCard>
      <Output content={content} />
    </ReceitaContainer>
  );
}

export default Prescription;