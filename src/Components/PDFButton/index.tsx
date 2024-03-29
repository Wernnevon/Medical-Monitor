import React from "react";

import { BTNContainer } from "./styles";

interface Params {
  copies: number;
  type: string;
}

const PDFButton: React.FC<Params> = ({ copies, type }: Params) => {
  async function handleGenPDF() {
    window.print();
  }

  return (
    <BTNContainer onClick={handleGenPDF}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="#555" viewBox="0 0 24 24">
        <path d="M14 20h-6v-1h6v1zm10-15v13h-4v6h-16v-6h-4v-13h4v-5h16v5h4zm-6 10h-12v7h12v-7zm0-13h-12v3h12v-3zm4 5.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5.224.5.5.5.5-.224.5-.5zm-6 9.5h-8v1h8v-1z" />
      </svg>
    </BTNContainer>
  );
};

export default PDFButton;
