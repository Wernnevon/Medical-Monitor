import React from 'react';

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { BTNContainer, Icon } from './styles';

const PDFButton: React.FC = () => {

    function handleGenPDF() {
        const input = document.getElementById("divToPrint") as HTMLElement;
        html2canvas(input).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: [297, 210],
          });
          pdf.addImage(imgData, "png", 2, 0, 148, 210);
          pdf.addImage(imgData, "png", 150, 0, 148, 210);
          // pdf.output('dataurlnewwindow');
          pdf.save("download.pdf");
        });
      }

  return (
    <BTNContainer onClick={handleGenPDF}>
        <Icon xmlns="http://www.w3.org/2000/svg" fill="#fff" width="50" height="50" viewBox="0 0 24 24">
            <path d="M14 20h-6v-1h6v1zm10-15v13h-4v6h-16v-6h-4v-13h4v-5h16v5h4zm-6 10h-12v7h12v-7zm0-13h-12v3h12v-3zm4 5.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5.224.5.5.5.5-.224.5-.5zm-6 9.5h-8v1h8v-1z"/>
        </Icon>
    </BTNContainer>
  );
}

export default PDFButton;